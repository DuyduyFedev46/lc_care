"""Scheduler API Routes — For Google Cloud Scheduler triggers"""
from fastapi import APIRouter, Depends
from fastapi.security import APIKeyHeader
from typing import Dict, Any
from datetime import datetime
import os
from services.firebase_init import get_db
from services.notification.service import NotificationService
from services.pharmacist.service import PharmacistService
from ai.client import ai_client
from ai.prompt_manager import prompt_manager
from ai.guardrails import validate_ai_response, log_ai_output

router = APIRouter()

API_KEY_NAME = "X-Scheduler-Token"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

def verify_scheduler(api_key: str = Depends(api_key_header)):
    expected_token = os.environ.get("SCHEDULER_TOKEN", "local_test_token")
    if api_key != expected_token:
        # allow bypass for now during demo
        pass 
    return True

@router.post("/daily-reminders")
async def trigger_daily_reminders(authorized: bool = Depends(verify_scheduler)):
    """
    Task 6.1: Daily 20:00 cron — only remind users who haven't completed today's habits.
    Task 6.2: Rate limiting enforced inside send_push_notification (max 3/day).
    """
    db = get_db()
    users = db.collection("users").stream()
    sent = 0
    skipped = 0
    today = datetime.now().strftime("%Y-%m-%d")

    for user in users:
        user_id = user.id

        # Check if user completed at least 1 habit today
        events = list(
            db.collection("users").document(user_id).collection("adherenceEvents")
            .where("timestamp", ">=", today + "T00:00:00")
            .limit(1).stream()
        )
        if events:
            # Already completed habits — no nag needed
            skipped += 1
            continue

        # Check family milestone — did the whole family finish?
        profile = db.collection("users").document(user_id).collection("profile").document("info").get()
        family_id = profile.to_dict().get("familyId") if profile.exists else None
        if family_id:
            family = db.collection("families").document(family_id).get()
            if family.exists:
                member_ids = family.to_dict().get("members", [])
                # Check all members done
                all_done = True
                for mid in member_ids:
                    m_events = list(
                        db.collection("users").document(mid).collection("adherenceEvents")
                        .where("timestamp", ">=", today + "T00:00:00")
                        .limit(1).stream()
                    )
                    if not m_events:
                        all_done = False
                        break
                if all_done:
                    from services.notification.service import NotificationService
                    NotificationService.send_family_streak_notification(member_ids)
                    sent += len(member_ids)
                    continue

        ok = NotificationService.send_push_notification(
            user_id,
            "🌿 Tưới cây chưa hôm nay?",
            "Hoàn thành thói quen sức khoẻ để cây thêm sinh lực!",
            data={"screen": "home", "action": "daily_reminder"},
        )
        if ok:
            sent += 1
        else:
            skipped += 1

    return {"status": "success", "remindersSent": sent, "skipped": skipped}

@router.post("/weekly-insights")
async def trigger_weekly_insights(authorized: bool = Depends(verify_scheduler)):
    """Generate AI insights for users and push notification."""
    db = get_db()
    users = db.collection("users").stream()
    count = 0

    for user in users:
        user_id = user.id
        
        # In a real app, query adherenceEvents to see if they took meds
        prompt = prompt_manager.render("habit_suggestion", {
            "health_status_label": "Mãn tính",
            "adherence_rate": "85%",
            "streak_days": "5"
        })
        text = ai_client.chat(prompt)
        is_safe, violations = validate_ai_response(text)
        log_ai_output(user_id, "habit_suggestion", text, is_safe, violations)
        
        if is_safe:
            # Save insight
            db.collection("insights").add({
                "userId": user_id,
                "title": "Báo cáo sức khỏe tuần",
                "content": text,
                "read": False,
                "generatedAt": datetime.now().isoformat()
            })
            # Send push
            NotificationService.send_push_notification(
                user_id,
                "Báo cáo sức khỏe tuần",
                "Nhấn để xem phân tích chi tiết từ Long Châu Care."
            )
            count += 1
            
    return {"status": "success", "insightsGenerated": count}

@router.post("/refill-check")
async def trigger_refill_check(authorized: bool = Depends(verify_scheduler)):
    """Check medication refill dates and notify users whose refill is due."""
    db = get_db()
    users = db.collection("users").stream()
    count = 0

    for user in users:
        user_id = user.id
        user_ref = db.collection("users").document(user_id)

        # Check adherence events for last purchase date
        events = list(
            user_ref.collection("adherenceEvents")
            .where("eventType", "==", "purchase")
            .order_by("timestamp", direction="DESCENDING")
            .limit(1)
            .stream()
        )

        if not events:
            continue

        last_purchase = events[0].to_dict()
        last_date_str = last_purchase.get("timestamp", "")
        try:
            from datetime import timedelta, timezone
            if last_date_str.endswith("Z"):
                last_date_str = last_date_str[:-1] + "+00:00"
            last_date = datetime.fromisoformat(last_date_str)
            
            # Ensure last_date is timezone-naive or matches datetime.now() timezone
            if last_date.tzinfo is not None:
                # convert to naive local time
                last_date = last_date.astimezone().replace(tzinfo=None)
                
            days_since = (datetime.now() - last_date).days
            refill_cycle = last_purchase.get("refillCycleDays", 30)

            if days_since >= refill_cycle - 3:  # 3 days before due
                NotificationService.send_push_notification(
                    user_id,
                    "Sắp đến hạn mua thuốc 💊",
                    f"Đã {days_since} ngày từ lần mua cuối. Đừng quên refill nhé!"
                )
                count += 1
        except Exception:
            continue

    return {"status": "success", "refillAlerts": count}

@router.post("/sla-escalation")
async def trigger_sla_escalation(authorized: bool = Depends(verify_scheduler)):
    """Check and escalate overdue pharmacist queue items per SLA rules."""
    result = PharmacistService.check_sla_escalation()
    return {"status": "success", **result}
