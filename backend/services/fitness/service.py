"""Google Fit OAuth + Data Sync Service"""
import httpx
from datetime import datetime, timezone, timedelta
from typing import Optional
from config import GOOGLE_FIT_CLIENT_ID, GOOGLE_FIT_CLIENT_SECRET, GOOGLE_FIT_REDIRECT_URI
from services.firebase_init import get_db

# Google OAuth endpoints
GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_FIT_API = "https://www.googleapis.com/fitness/v1/users/me"

# Scopes — chỉ đọc, không ghi
SCOPES = [
    "https://www.googleapis.com/auth/fitness.activity.read",
    "https://www.googleapis.com/auth/fitness.heart_rate.read",
    "https://www.googleapis.com/auth/fitness.body.read",
    "https://www.googleapis.com/auth/fitness.sleep.read",
    "https://www.googleapis.com/auth/fitness.blood_pressure.read",
    "https://www.googleapis.com/auth/fitness.blood_glucose.read",
]


class FitnessService:

    @staticmethod
    def get_auth_url(state: str) -> str:
        """Tạo Google OAuth URL để redirect user"""
        params = {
            "client_id": GOOGLE_FIT_CLIENT_ID,
            "redirect_uri": GOOGLE_FIT_REDIRECT_URI,
            "response_type": "code",
            "scope": " ".join(SCOPES),
            "access_type": "offline",   # Bắt buộc để nhận refresh_token
            "prompt": "consent",         # Bắt buộc để Google luôn trả refresh_token
            "state": state,              # user_id để biết callback thuộc về ai
        }
        query = "&".join(f"{k}={httpx.URL('', params={k: v}).params}" for k, v in params.items())
        # Build URL thủ công để tránh double-encode
        import urllib.parse
        query_str = urllib.parse.urlencode(params)
        return f"{GOOGLE_AUTH_URL}?{query_str}"

    @staticmethod
    async def exchange_code(code: str) -> dict:
        """Đổi authorization code lấy access_token + refresh_token"""
        async with httpx.AsyncClient() as client:
            resp = await client.post(GOOGLE_TOKEN_URL, data={
                "code": code,
                "client_id": GOOGLE_FIT_CLIENT_ID,
                "client_secret": GOOGLE_FIT_CLIENT_SECRET,
                "redirect_uri": GOOGLE_FIT_REDIRECT_URI,
                "grant_type": "authorization_code",
            })
            resp.raise_for_status()
            return resp.json()

    @staticmethod
    async def refresh_access_token(refresh_token: str) -> dict:
        """Dùng refresh_token để lấy access_token mới"""
        async with httpx.AsyncClient() as client:
            resp = await client.post(GOOGLE_TOKEN_URL, data={
                "refresh_token": refresh_token,
                "client_id": GOOGLE_FIT_CLIENT_ID,
                "client_secret": GOOGLE_FIT_CLIENT_SECRET,
                "grant_type": "refresh_token",
            })
            resp.raise_for_status()
            return resp.json()

    @staticmethod
    def save_tokens(user_id: str, token_data: dict):
        """Lưu tokens vào Firestore — users/{uid}/integrations/google_fit"""
        db = get_db()
        now = datetime.now(timezone.utc).isoformat()
        expires_in = token_data.get("expires_in", 3600)
        expiry = (datetime.now(timezone.utc) + timedelta(seconds=expires_in)).isoformat()

        doc = {
            "connected": True,
            "access_token": token_data["access_token"],
            "token_expiry": expiry,
            "scopes": token_data.get("scope", "").split(),
            "connected_at": now,
            "last_synced_at": None,
        }
        # refresh_token chỉ có lần đầu (khi prompt=consent)
        if "refresh_token" in token_data:
            doc["refresh_token"] = token_data["refresh_token"]

        db.collection("users").document(user_id)\
          .collection("integrations").document("google_fit")\
          .set(doc, merge=True)

    @staticmethod
    def get_tokens(user_id: str) -> Optional[dict]:
        """Lấy tokens từ Firestore"""
        db = get_db()
        doc = db.collection("users").document(user_id)\
                .collection("integrations").document("google_fit").get()
        if not doc.exists:
            return None
        return doc.to_dict()

    @staticmethod
    def disconnect(user_id: str):
        """Xóa tokens — ngắt kết nối"""
        db = get_db()
        db.collection("users").document(user_id)\
          .collection("integrations").document("google_fit")\
          .set({"connected": False, "access_token": None, "refresh_token": None}, merge=True)

    @staticmethod
    async def get_valid_access_token(user_id: str) -> Optional[str]:
        """Lấy access_token còn hạn, tự refresh nếu hết hạn"""
        tokens = FitnessService.get_tokens(user_id)
        if not tokens or not tokens.get("connected"):
            return None

        # Kiểm tra expiry
        expiry_str = tokens.get("token_expiry")
        if expiry_str:
            expiry = datetime.fromisoformat(expiry_str)
            if expiry.tzinfo is None:
                expiry = expiry.replace(tzinfo=timezone.utc)
            # Còn hơn 5 phút → dùng luôn
            if expiry > datetime.now(timezone.utc) + timedelta(minutes=5):
                return tokens["access_token"]

        # Hết hạn → refresh
        refresh_token = tokens.get("refresh_token")
        if not refresh_token:
            return None

        try:
            new_tokens = await FitnessService.refresh_access_token(refresh_token)
            FitnessService.save_tokens(user_id, new_tokens)
            return new_tokens["access_token"]
        except Exception as e:
            print(f"[FitnessService] Failed to refresh token for {user_id}: {e}")
            return None

    @staticmethod
    async def fetch_fitness_data(user_id: str) -> dict:
        """
        Lấy dữ liệu sức khoẻ từ Google Fit API.
        Trả về raw data — KHÔNG suy ra bệnh (tuân thủ Rule #0).
        """
        access_token = await FitnessService.get_valid_access_token(user_id)
        if not access_token:
            return {"error": "not_connected"}

        # Lấy data 7 ngày gần nhất
        end_ms = int(datetime.now(timezone.utc).timestamp() * 1000)
        start_ms = int((datetime.now(timezone.utc) - timedelta(days=7)).timestamp() * 1000)

        headers = {"Authorization": f"Bearer {access_token}"}
        results = {}

        async with httpx.AsyncClient() as client:
            # 1. Bước chân
            steps = await FitnessService._aggregate(
                client, headers, start_ms, end_ms,
                "com.google.step_count.delta",
                "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
            )
            results["steps_7d"] = steps

            # 2. Nhịp tim trung bình
            hr = await FitnessService._aggregate(
                client, headers, start_ms, end_ms,
                "com.google.heart_rate.bpm",
                "derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm"
            )
            results["heart_rate_7d"] = hr

            # 3. Cân nặng (lần gần nhất)
            weight = await FitnessService._aggregate(
                client, headers, start_ms, end_ms,
                "com.google.weight",
                "derived:com.google.weight:com.google.android.gms:merge_weight"
            )
            results["weight_latest"] = weight

            # 4. Giấc ngủ — dùng Sessions API (chính xác hơn aggregate)
            sleep = await FitnessService._fetch_sleep_sessions(
                client, headers, start_ms, end_ms
            )
            results["sleep_7d"] = sleep

        # Lưu vào Firestore
        db = get_db()
        now = datetime.now(timezone.utc).isoformat()
        db.collection("users").document(user_id)\
          .collection("integrations").document("google_fit")\
          .update({"last_synced_at": now})

        # Lưu health_metrics (raw data, không suy ra bệnh)
        today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        db.collection("users").document(user_id)\
          .collection("health_metrics").document(today)\
          .set({
              "date": today,
              "source": "google_fit",
              "raw": results,
              "synced_at": now,
          }, merge=True)

        return results

    @staticmethod
    async def _aggregate(client: httpx.AsyncClient, headers: dict,
                         start_ms: int, end_ms: int,
                         data_type: str, data_source: str) -> list:
        """Helper: gọi Google Fit Aggregate API cho 1 data type"""
        try:
            body = {
                "aggregateBy": [{"dataTypeName": data_type, "dataSourceId": data_source}],
                "bucketByTime": {"durationMillis": 86400000},  # 1 ngày / bucket
                "startTimeMillis": start_ms,
                "endTimeMillis": end_ms,
            }
            resp = await client.post(
                f"{GOOGLE_FIT_API}/dataset:aggregate",
                headers=headers,
                json=body,
                timeout=10.0,
            )
            if resp.status_code != 200:
                return []
            data = resp.json()
            buckets = data.get("bucket", [])
            result = []
            for bucket in buckets:
                date = datetime.fromtimestamp(
                    int(bucket["startTimeMillis"]) / 1000, tz=timezone.utc
                ).strftime("%Y-%m-%d")
                points = []
                for ds in bucket.get("dataset", []):
                    for pt in ds.get("point", []):
                        for val in pt.get("value", []):
                            v = val.get("fpVal") or val.get("intVal")
                            if v is not None:
                                points.append(v)
                result.append({"date": date, "values": points})
            return result
        except Exception as e:
            print(f"[FitnessService] Aggregate error for {data_type}: {e}")
            return []

    @staticmethod
    async def _fetch_sleep_sessions(client: httpx.AsyncClient, headers: dict,
                                    start_ms: int, end_ms: int) -> list:
        """
        Lấy giấc ngủ qua Sessions API — chính xác hơn aggregate.
        Google Fit lưu sleep dưới dạng sessions với activityType=72 (sleep).
        Trả về list { date, values: [duration_minutes] } theo từng ngày.
        """
        try:
            params = {
                "startTime": datetime.fromtimestamp(start_ms / 1000, tz=timezone.utc).strftime(
                    "%Y-%m-%dT%H:%M:%S.000Z"
                ),
                "endTime": datetime.fromtimestamp(end_ms / 1000, tz=timezone.utc).strftime(
                    "%Y-%m-%dT%H:%M:%S.000Z"
                ),
                "activityType": 72,  # 72 = Sleep
            }
            resp = await client.get(
                f"{GOOGLE_FIT_API}/sessions",
                headers=headers,
                params=params,
                timeout=10.0,
            )
            if resp.status_code != 200:
                print(f"[FitnessService] Sleep sessions error: {resp.status_code} {resp.text}")
                return []

            sessions = resp.json().get("session", [])
            # Gộp theo ngày (dùng ngày bắt đầu session)
            by_date: dict = {}
            for s in sessions:
                start_ns = int(s.get("startTimeMillis", 0))
                end_ns = int(s.get("endTimeMillis", 0))
                duration_min = (end_ns - start_ns) / 60000  # ms → phút
                if duration_min <= 0:
                    continue
                date = datetime.fromtimestamp(start_ns / 1000, tz=timezone.utc).strftime("%Y-%m-%d")
                by_date.setdefault(date, 0)
                by_date[date] += duration_min

            return [{"date": d, "values": [round(mins)]} for d, mins in sorted(by_date.items())]

        except Exception as e:
            print(f"[FitnessService] Sleep sessions error: {e}")
            return []
