from typing import List, Dict, Any
from datetime import datetime, date, timezone
from services.firebase_init import get_db

# Push message templates — NO banned medical words (Rule #0)
TEMPLATES = {
    "WATER_REMINDER": {
        "title": "💧 {sender} đã tưới cây {plant} cho bạn",
        "body":  "Nhớ {habit} hôm nay nhé!",
    },
    "HABIT_STREAK": {
        "title": "🔥 Bạn đang có chuỗi {streak} ngày!",
        "body":  "Hoàn thành thói quen hôm nay để giữ streak nhé!",
    },
    "REFILL_ALERT": {
        "title": "💊 {med} sắp hết",
        "body":  "Còn ~5 ngày. Đặt trước để không bị gián đoạn nhé!",  # NO 'điều trị'
    },
    "PHARMACIST_APPROVED": {
        "title": "✅ Dược sĩ đã duyệt kế hoạch sức khoẻ",
        "body":  "Cây {plant} đã sẵn sàng. Bắt đầu hành trình từ hôm nay!",
    },
    "FAMILY_MILESTONE": {
        "title": "🎉 Gia đình đạt chuỗi 7 ngày cùng nhau!",
        "body":  "Nhận badge gia đình đặc biệt ngay!",
    },
}

MAX_PUSH_PER_DAY = 3  # Guardrail: spam protection


class NotificationService:
    @staticmethod
    def get_notifications(user_id: str) -> List[Dict[str, Any]]:
        db = get_db()
        insights = db.collection("insights").where("userId", "==", user_id).order_by("generatedAt", direction="DESCENDING").stream()
        return [{"id": doc.id, **doc.to_dict()} for doc in insights]

    @staticmethod
    def mark_as_read(user_id: str, notification_id: str) -> Dict[str, Any]:
        db = get_db()
        insight_ref = db.collection("insights").document(notification_id)
        insight_doc = insight_ref.get()
        if not insight_doc.exists or insight_doc.to_dict().get("userId") != user_id:
            return {"success": False, "message": "Notification not found or unauthorized"}
        insight_ref.update({"read": True})
        return {"success": True}

    @staticmethod
    def register_device(user_id: str, token: str) -> Dict[str, Any]:
        """Register FCM token. Overwrites if device switches account."""
        db = get_db()
        db.collection("users").document(user_id).set(
            {"fcmToken": token, "fcmTokenUpdatedAt": datetime.now(timezone.utc).isoformat()},
            merge=True
        )
        
        # Drain pending notifications
        try:
            pending_ref = db.collection("users").document(user_id).collection("pending_notifications")
            pending_docs = list(pending_ref.stream())
            for doc in pending_docs:
                p_data = doc.to_dict()
                sent = NotificationService.send_push_notification(
                    user_id=user_id,
                    title=p_data.get("title", ""),
                    body=p_data.get("body", ""),
                    data=p_data.get("data"),
                    skip_rate_limit=True
                )
                if sent:
                    doc.reference.delete()
        except Exception as e:
            print(f"[FCM] Failed to drain pending notifications for {user_id}: {e}")
            
        return {"success": True}

    @staticmethod
    def _check_rate_limit(db, user_id: str) -> bool:
        """Return True if user can still receive a push today (< MAX_PUSH_PER_DAY)."""
        today = date.today().isoformat()
        count_ref = db.collection("users").document(user_id).collection("push_count").document(today)
        doc = count_ref.get()
        if not doc.exists:
            return True
        return doc.to_dict().get("count", 0) < MAX_PUSH_PER_DAY

    @staticmethod
    def _increment_push_count(db, user_id: str):
        today = date.today().isoformat()
        count_ref = db.collection("users").document(user_id).collection("push_count").document(today)
        doc = count_ref.get()
        current = doc.to_dict().get("count", 0) if doc.exists else 0
        count_ref.set({"count": current + 1, "date": today})

    @staticmethod
    def send_push_notification(
        user_id: str,
        title: str,
        body: str,
        data: Dict[str, str] = None,
        skip_rate_limit: bool = False,
    ) -> bool:
        """Send FCM push. Enforces 3-push/day rate limit. Writes to medical_audit_log."""
        db = get_db()

        # Rate limiting
        if not skip_rate_limit and not NotificationService._check_rate_limit(db, user_id):
            print(f"[FCM] Rate limit reached for user {user_id} — skipping push")
            return False

        user_doc = db.collection("users").document(user_id).get()
        if not user_doc.exists:
            return False
        token = user_doc.to_dict().get("fcmToken")
        if not token:
            # Fallback: store in pending_notifications
            db.collection("users").document(user_id).collection("pending_notifications").add({
                "title": title, "body": body, "data": data or {},
                "createdAt": datetime.now(timezone.utc).isoformat()
            })
            return False

        success = False
        import time
        attempts = 3
        last_error = None
        for attempt in range(attempts):
            try:
                from firebase_admin import messaging
                message = messaging.Message(
                    notification=messaging.Notification(title=title, body=body),
                    data={**(data or {}), "screen": (data or {}).get("screen", "home")},
                    token=token
                )
                messaging.send(message)
                success = True
                NotificationService._increment_push_count(db, user_id)
                break
            except Exception as e:
                last_error = e
                print(f"[FCM] Attempt {attempt + 1} failed to send to {user_id}: {e}")
                if attempt < attempts - 1:
                    time.sleep(2 ** attempt)
                    
        if not success:
            print(f"[FCM] Failed to send to {user_id} after {attempts} attempts. Last error: {last_error}")

        # Medical audit log — immutable record (Guardrail #5)
        db.collection("medical_audit_log").add({
            "action": "push_notification_sent",
            "userId": user_id,
            "title": title,
            "body": body,
            "success": success,
            "timestamp": datetime.now(timezone.utc).isoformat(),
        })
        return success

    @staticmethod
    def send_water_reminder(
        sender_name: str, target_user_id: str, plant_name: str, habit_name: str
    ) -> bool:
        """Convenience: send WATER_REMINDER push when someone waters for a family member."""
        tmpl = TEMPLATES["WATER_REMINDER"]
        return NotificationService.send_push_notification(
            target_user_id,
            title=tmpl["title"].format(sender=sender_name, plant=plant_name),
            body=tmpl["body"].format(habit=habit_name),
            data={"screen": "home", "action": "water_reminder"},
        )

    @staticmethod
    def send_family_streak_notification(user_ids: List[str]) -> int:
        """Send FAMILY_MILESTONE push to all members when everyone completes habits."""
        tmpl = TEMPLATES["FAMILY_MILESTONE"]
        sent = 0
        for uid in user_ids:
            ok = NotificationService.send_push_notification(
                uid, title=tmpl["title"], body=tmpl["body"],
                data={"screen": "tab-family"}, skip_rate_limit=True
            )
            if ok:
                sent += 1
        return sent
