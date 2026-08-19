import uuid
import hashlib
from datetime import datetime, timezone, timedelta
from typing import List, Dict, Any, Optional
from services.firebase_init import get_db
from google.cloud.firestore_v1 import Increment

def get_vietnam_now() -> datetime:
    """Return current time in Vietnam (ICT, UTC+7) regardless of container OS timezone."""
    return datetime.utcnow() + timedelta(hours=7)


class FamilyService:

    @staticmethod
    def _get_member_garden(db, user_id: str) -> Dict[str, Any]:
        """Fetch plant/streak/level/status info for a single member from carePlans and adherenceEvents."""
        plant_type = None
        plant_status = "growing"
        level = 1

        try:
            care_plans = db.collection("users").document(user_id).collection("carePlans").limit(1).get()
            if care_plans:
                plan = care_plans[0].to_dict()
                plant_type = plan.get("plantType")
                plant_status = plan.get("plantStatus", "growing")
                level = plan.get("plantLevel", 1)
        except Exception:
            pass

        # Calculate streak — count consecutive calendar days (same logic as GardenService)
        streak = 0
        try:
            events = db.collection("users").document(user_id).collection("adherenceEvents") \
                .order_by("timestamp", direction="DESCENDING").limit(30).stream()
            event_dates = set()
            today_dt = get_vietnam_now()
            today_str = today_dt.strftime("%Y-%m-%d")
            for evt in events:
                evt_date = evt.to_dict().get("timestamp", "")[:10]
                if evt_date:
                    event_dates.add(evt_date)
            check_date = today_dt
            if today_str not in event_dates:
                check_date = today_dt - timedelta(days=1)
            while check_date.strftime("%Y-%m-%d") in event_dates:
                streak += 1
                check_date -= timedelta(days=1)
        except Exception:
            pass

        return {
            "plant": plant_type,
            "streak": streak,
            "level": level,
            "status": plant_status,
        }

    @staticmethod
    def _ensure_family(db, user_id: str) -> str:
        """Return existing familyId or create a new family for this user."""
        profile_ref = db.collection("users").document(user_id).collection("profile").document("info")
        profile_doc = profile_ref.get()
        family_id = None
        if profile_doc.exists:
            family_id = profile_doc.to_dict().get("familyId")

        if not family_id:
            family_ref = db.collection("families").document()
            family_id = family_ref.id
            profile_ref.set({"familyId": family_id}, merge=True)
            family_ref.set({
                "name": "Gia đình",
                "members": [user_id],
                "totalPoints": 0,
                "createdAt": datetime.now(timezone.utc).isoformat(),
            })
        return family_id

    # ── Public API ────────────────────────────────────────────────────────────

    @staticmethod
    def get_family_info(user_id: str) -> Dict[str, Any]:
        db = get_db()
        
        # Always ensure the user has a family first
        family_id = FamilyService._ensure_family(db, user_id)

        family_doc = db.collection("families").document(family_id).get()
        if not family_doc.exists:
            return {"members": [], "totalPoints": 0}

        family_data = family_doc.to_dict()
        members = []
        for mid in family_data.get("members", []):
            m_profile = db.collection("users").document(mid).collection("profile").document("info").get()
            m_data = m_profile.to_dict() if m_profile.exists else {}
            
            # Fallback to root user document if name is not set in the profile info document
            if not m_data.get("fullName") and not m_data.get("name"):
                root_user = db.collection("users").document(mid).get()
                if root_user.exists:
                    r_data = root_user.to_dict()
                    m_data["fullName"] = r_data.get("fullName") or r_data.get("name")
                    if not m_data.get("role"):
                        m_data["role"] = r_data.get("role")
            
            m_name = m_data.get("fullName") or m_data.get("name") or "Thành viên"
            m_role = m_data.get("role") or "user"
            
            garden_data = FamilyService._get_member_garden(db, mid)
            members.append({
                "id": mid,
                "name": m_name,
                "role": m_role,
                "avatar": m_data.get("avatar"),
                "relation": m_data.get("relation"),
                "isMe": mid == user_id,
                **garden_data,
            })

        # Fetch today's water activity for this family
        member_ids = set(m["id"] for m in members)
        water_activity = []
        try:
            today = get_vietnam_now().strftime("%Y-%m-%d")
            logs_ref = db.collection("water_logs").document(today).collection("logs").stream()
            for log in logs_ref:
                ld = log.to_dict()
                sender = ld.get("senderId", "")
                target = ld.get("targetId", "")
                if sender in member_ids or target in member_ids:
                    water_activity.append({
                        "senderId": sender,
                        "senderName": ld.get("senderName", ""),
                        "targetId": target,
                        "plantName": ld.get("plantName", ""),
                        "timestamp": ld.get("timestamp", ""),
                    })
        except Exception as e:
            print(f"[family] water activity fetch failed: {e}")

        return {
            "id": family_id,
            "name": family_data.get("name", "Gia đình"),
            "members": members,
            "totalPoints": family_data.get("totalPoints", 0),
            "waterActivity": water_activity,
        }

    @staticmethod
    def create_invite(user_id: str) -> Dict[str, Any]:
        """Create a short-lived invite token for this user's family."""
        db = get_db()
        family_id = FamilyService._ensure_family(db, user_id)

        # Generate a 10-char token (URL-safe)
        raw = f"{family_id}-{user_id}-{uuid.uuid4()}"
        token = hashlib.sha256(raw.encode()).hexdigest()[:12]

        expires_at = (datetime.now(timezone.utc) + timedelta(hours=72)).isoformat()

        db.collection("invites").document(token).set({
            "familyId": family_id,
            "createdBy": user_id,
            "expiresAt": expires_at,
            "used": False,
        })

        hosting_url = "https://chauthuc.web.app"
        invite_url = f"{hosting_url}?invite={token}"
        return {"inviteToken": token, "inviteUrl": invite_url, "expiresAt": expires_at}

    @staticmethod
    def join_family_by_invite(user_id: str, invite_token: str) -> Dict[str, Any]:
        """Link user to a family using an invite token."""
        db = get_db()
        invite_ref = db.collection("invites").document(invite_token)
        invite_doc = invite_ref.get()

        if not invite_doc.exists:
            return {"success": False, "message": "Link mời không hợp lệ."}

        invite_data = invite_doc.to_dict()

        if invite_data.get("used"):
            return {"success": False, "message": "Link mời đã được sử dụng rồi."}

        expires_at_str = invite_data.get("expiresAt", "")
        if expires_at_str:
            try:
                expires_at = datetime.fromisoformat(expires_at_str)
                if datetime.now(timezone.utc) > expires_at:
                    return {"success": False, "message": "Link mời đã hết hạn."}
            except ValueError:
                pass

        family_id = invite_data.get("familyId")
        family_ref = db.collection("families").document(family_id)
        family_doc = family_ref.get()

        if not family_doc.exists:
            return {"success": False, "message": "Gia đình không tồn tại."}

        members = family_doc.to_dict().get("members", [])

        if user_id in members:
            # Already a member — just return success
            return {"success": True, "familyId": family_id, "alreadyMember": True}

        if len(members) >= 6:
            return {"success": False, "message": "Gia đình đã đạt tối đa 6 thành viên."}

        members.append(user_id)
        family_ref.update({"members": members})

        # Update user profile with familyId
        db.collection("users").document(user_id).collection("profile").document("info").set(
            {"familyId": family_id}, merge=True
        )

        # Mark invite as used
        invite_ref.update({"used": True, "usedBy": user_id})

        return {"success": True, "familyId": family_id}

    @staticmethod
    def add_member(user_id: str, member_data: Dict[str, Any]) -> Dict[str, Any]:
        """Legacy add_member — now just creates an invite link."""
        result = FamilyService.create_invite(user_id)
        return {"success": True, **result}

    @staticmethod
    def get_calendar(user_id: str) -> List[Dict[str, Any]]:
        db = get_db()
        profile_doc = db.collection("users").document(user_id).collection("profile").document("info").get()
        family_id = None
        if profile_doc.exists:
            family_id = profile_doc.to_dict().get("familyId")

        if not family_id:
            return []

        calendars = db.collection("familyCalendars").where("familyId", "==", family_id).stream()
        return [{"id": doc.id, **doc.to_dict()} for doc in calendars]

    @staticmethod
    def add_calendar_event(user_id: str, dateFull: str, member: str, activity: str, location: str, color: str) -> Dict[str, Any]:
        """Add a new appointment to family calendar — persist to backend."""
        db = get_db()
        family_id = FamilyService._ensure_family(db, user_id)

        # Parse dateFull to get day-of-week & date-in-month
        try:
            dt = datetime.strptime(dateFull, "%Y-%m-%d")
            day_num = dt.weekday()  # 0=Mon, 6=Sun
            days_vi = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]
            day = days_vi[day_num]
            date_str = str(dt.day)
        except ValueError:
            raise ValueError(f"Invalid dateFull format: {dateFull}")

        # Query for existing doc on this date
        docs = db.collection("familyCalendars").where("familyId", "==", family_id).where("dateFull", "==", dateFull).limit(1).stream()
        doc_list = list(docs)

        event = {"member": member, "activity": activity, "location": location, "color": color}

        if doc_list:
            # Update existing doc
            doc_id = doc_list[0].id
            doc_ref = db.collection("familyCalendars").document(doc_id)
            doc_data = doc_list[0].to_dict()
            events = doc_data.get("events", [])
            events.append(event)
            doc_ref.update({"events": events})
            return {"id": doc_id, **doc_data, "events": events}
        else:
            # Create new doc
            doc_ref = db.collection("familyCalendars").document()
            doc_id = doc_ref.id
            new_doc = {
                "familyId": family_id,
                "day": day,
                "date": date_str,
                "dateFull": dateFull,
                "events": [event]
            }
            doc_ref.set(new_doc)
            return {"id": doc_id, **new_doc}

    @staticmethod
    def update_calendar_event(user_id: str, dateFull: str, event_index: int, patch: Dict[str, Any]) -> Dict[str, Any]:
        """Update an appointment on the family calendar."""
        db = get_db()
        profile_doc = db.collection("users").document(user_id).collection("profile").document("info").get()
        if not profile_doc.exists:
            raise ValueError("User profile not found")

        family_id = profile_doc.to_dict().get("familyId")
        if not family_id:
            raise ValueError("User not in a family")

        docs = db.collection("familyCalendars").where("familyId", "==", family_id).where("dateFull", "==", dateFull).limit(1).stream()
        doc_list = list(docs)
        if not doc_list:
            raise ValueError(f"No calendar doc found for date {dateFull}")

        doc_ref = db.collection("familyCalendars").document(doc_list[0].id)
        doc_data = doc_list[0].to_dict()
        events = doc_data.get("events", [])

        if event_index < 0 or event_index >= len(events):
            raise ValueError(f"Event index {event_index} out of range")

        # Merge patch into existing event
        events[event_index] = {**events[event_index], **patch}
        doc_ref.update({"events": events})

        return {"id": doc_list[0].id, **doc_data, "events": events}

    @staticmethod
    def delete_calendar_event(user_id: str, dateFull: str, event_index: int) -> Dict[str, Any]:
        """Delete an appointment from the family calendar."""
        db = get_db()
        profile_doc = db.collection("users").document(user_id).collection("profile").document("info").get()
        if not profile_doc.exists:
            raise ValueError("User profile not found")

        family_id = profile_doc.to_dict().get("familyId")
        if not family_id:
            raise ValueError("User not in a family")

        docs = db.collection("familyCalendars").where("familyId", "==", family_id).where("dateFull", "==", dateFull).limit(1).stream()
        doc_list = list(docs)
        if not doc_list:
            raise ValueError(f"No calendar doc found for date {dateFull}")

        doc_ref = db.collection("familyCalendars").document(doc_list[0].id)
        doc_data = doc_list[0].to_dict()
        events = doc_data.get("events", [])

        if event_index < 0 or event_index >= len(events):
            raise ValueError(f"Event index {event_index} out of range")

        events.pop(event_index)
        doc_ref.update({"events": events})

        return {"id": doc_list[0].id, **doc_data, "events": events}

    @staticmethod
    def water_for_member(sender_id: str, target_id: str) -> Dict[str, Any]:
        """
        Task 3.1/3.2: Tưới hộ — sender waters target's plant.
        - Deduplication: 1 lần/ngày/cặp sender+target (first-write-wins).
        - Awards +5 pts to sender via Firestore transaction.
        - Triggers FCM WATER_REMINDER push to target (Rule #0 compliant).
        """
        db = get_db()
        today = get_vietnam_now().strftime("%Y-%m-%d")
        log_doc_id = f"{sender_id}_{target_id}"
        log_ref = db.collection("water_logs").document(today).collection("logs").document(log_doc_id)

        # Duplicate check
        existing = log_ref.get()
        if existing.exists:
            return {"success": False, "message": "Hôm nay bạn đã tưới hộ thành viên này rồi!"}

        # Fetch sender info (for push message)
        sender_profile = db.collection("users").document(sender_id).collection("profile").document("info").get()
        sender_name = "Thành viên gia đình"
        if sender_profile.exists:
            d = sender_profile.to_dict()
            sender_name = d.get("fullName") or d.get("name") or sender_name

        # Fetch target's plant name (for push message)
        plant_name = "sức khoẻ"
        plant_label = "cây"
        target_plans = db.collection("users").document(target_id).collection("carePlans").limit(1).get()
        if target_plans:
            plan_data = target_plans[0].to_dict()
            plant_label = plan_data.get("plantLabel", "cây")
            plant_name = plant_label

        # Fetch first undone habit name (for push body)
        habit_name = "thói quen sức khoẻ"
        if target_plans:
            habits = plan_data.get("habits", [])
            undone = [h for h in habits if not h.get("done", False)]
            if undone:
                habit_name = undone[0].get("name", habit_name)

        # Write water log (dedup key)
        log_ref.set({
            "senderId": sender_id,
            "targetId": target_id,
            "senderName": sender_name,
            "plantName": plant_name,
            "timestamp": get_vietnam_now().isoformat(),
        })

        # Award +5 pts to sender
        try:
            loyalty_ref = db.collection("users").document(sender_id).collection("loyaltySummary").document("info")
            loyalty_doc = loyalty_ref.get()
            if loyalty_doc.exists:
                loyalty_ref.update({"totalPoints": Increment(5)})
            else:
                loyalty_ref.set({"totalPoints": 5, "familyPoints": 0, "tier": "Bronze", "voucherHistory": []})
        except Exception as e:
            print(f"[water] Could not award points to {sender_id}: {e}")

        # Send FCM push (non-blocking: ignore failure)
        try:
            from services.notification.service import NotificationService
            NotificationService.send_water_reminder(
                sender_name=sender_name,
                target_user_id=target_id,
                plant_name=plant_name,
                habit_name=habit_name,
            )
        except Exception as e:
            print(f"[water] FCM push failed (non-critical): {e}")

        return {
            "success": True,
            "senderPoints": 5,
            "message": f"Đã tưới cây {plant_label} cho thành viên này!",
        }

