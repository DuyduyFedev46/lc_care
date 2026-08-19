from typing import List, Dict, Any
from datetime import datetime, timedelta
from services.firebase_init import get_db
from google.cloud.firestore_v1 import Increment
from services.garden.achievements_catalog import ACHIEVEMENTS_CATALOG, QUESTS_CATALOG

def get_vietnam_now() -> datetime:
    """Return current time in Vietnam (ICT, UTC+7) regardless of container OS timezone."""
    return datetime.utcnow() + timedelta(hours=7)

class GardenService:
    @staticmethod
    def get_garden_summary(user_id: str) -> Dict[str, Any]:
        db = get_db()
        user_ref = db.collection("users").document(user_id)
        
        # Get active care plan (include both "growing" and "pending" so frontend can show pending UI)
        active_plan = None
        active_plan_ref = None
        for status in ["growing", "pending", "paused"]:
            care_plans = user_ref.collection("carePlans").where("plantStatus", "==", status).limit(1).stream()
            for doc in care_plans:
                active_plan = doc.to_dict()
                active_plan["id"] = doc.id
                active_plan_ref = doc.reference
                break
            if active_plan:
                break
        
        # Daily reset: if habits were done on a previous day, reset them
        if active_plan and active_plan.get("habits"):
            today_str_reset = get_vietnam_now().strftime("%Y-%m-%d")
            habits = active_plan["habits"]
            needs_reset = False
            for h in habits:
                if h.get("done"):
                    done_at = h.get("doneAt", "")
                    if not done_at or done_at[:10] != today_str_reset:
                        h["done"] = False
                        h["doneAt"] = None
                        needs_reset = True
            if needs_reset and active_plan_ref:
                active_plan_ref.update({"habits": habits})
            
        # Get loyalty summary
        loyalty_doc = user_ref.collection("loyaltySummary").document("info").get()
        loyalty = loyalty_doc.to_dict() if loyalty_doc.exists else {"totalPoints": 0}
        
        # Get recent adherence events to calculate streak
        events = user_ref.collection("adherenceEvents").order_by("timestamp", direction="DESCENDING").limit(30).stream()
        
        event_dates = set()
        today_watered = False
        today_dt = get_vietnam_now()
        today_str = today_dt.strftime("%Y-%m-%d")
        
        for evt in events:
            evt_data = evt.to_dict()
            evt_date = evt_data.get("timestamp", "")[:10]
            if evt_date:
                event_dates.add(evt_date)
                if evt_date == today_str:
                    today_watered = True
                    
        # Calculate consecutive days streak
        streak = 0
        from datetime import timedelta
        check_date = today_dt
        if today_str not in event_dates:
            check_date = today_dt - timedelta(days=1)
            
        while check_date.strftime("%Y-%m-%d") in event_dates:
            streak += 1
            check_date -= timedelta(days=1)
            
        # Add stage calculation to care plan summary (1-7 -> 1, 8-14 -> 2, 15-29 -> 3, 30+ -> 4)
        if active_plan:
            stage = 1
            if streak >= 30:
                stage = 4
            elif streak >= 15:
                stage = 3
            elif streak >= 8:
                stage = 2
            active_plan["stage"] = stage
            
        return {
            "carePlan": active_plan,
            "points": loyalty.get("totalPoints", 0),
            "streak": streak,
            "todayWatered": today_watered
        }

    @staticmethod
    def water_plant(user_id: str, habit_id: str) -> Dict[str, Any]:
        db = get_db()
        user_ref = db.collection("users").document(user_id)
        now = get_vietnam_now()
        today_str = now.strftime("%Y-%m-%d")

        # Guard: prevent duplicate watering of same habit on same day
        existing = user_ref.collection("adherenceEvents") \
            .where("habitId", "==", habit_id) \
            .stream()
        for evt in existing:
            evt_date = evt.to_dict().get("timestamp", "")[:10]
            if evt_date == today_str:
                return {"success": False, "message": "Already watered today"}

        # 1. Create adherence event
        event_ref = user_ref.collection("adherenceEvents").document()
        event_data = {
            "eventType": "water",
            "habitId": habit_id,
            "pointsEarned": 10,
            "timestamp": now.isoformat()
        }
        event_ref.set(event_data)
        
        # 2. Update points
        loyalty_ref = user_ref.collection("loyaltySummary").document("info")
        loyalty_doc = loyalty_ref.get()
        if loyalty_doc.exists:
            loyalty_ref.update({"totalPoints": Increment(10)})
        else:
            loyalty_ref.set({"totalPoints": 10, "familyPoints": 0, "tier": "Bronze", "voucherHistory": []})
        
        # 3. Mark habit as done in carePlan
        # Find active plan
        active_plan_ref = None
        for status in ["growing", "pending", "paused"]:
            care_plans = user_ref.collection("carePlans").where("plantStatus", "==", status).limit(1).stream()
            for doc in care_plans:
                active_plan_ref = doc.reference
                break
            if active_plan_ref:
                break
                
        if active_plan_ref:
            plan_doc = active_plan_ref.get()
            if plan_doc.exists:
                plan = plan_doc.to_dict()
                habits = plan.get("habits", [])
                updated = False
                for h in habits:
                    if h.get("id") == habit_id:
                        h["done"] = True
                        h["doneAt"] = now.isoformat()
                        updated = True
                        break
                if updated:
                    active_plan_ref.update({"habits": habits})
            
        return {"success": True, "event": event_data, "message": "Watered successfully"}

    @staticmethod
    def get_streak(user_id: str) -> List[Dict[str, Any]]:
        db = get_db()
        events = db.collection("users").document(user_id).collection("adherenceEvents").order_by("timestamp", direction="DESCENDING").stream()
        return [{"id": evt.id, **evt.to_dict()} for evt in events]
        
    @staticmethod
    def _build_user_metrics(user_id: str) -> Dict[str, Any]:
        """Compute all engagement metrics needed for achievements and quests."""
        db = get_db()
        user_ref = db.collection("users").document(user_id)
        summary = GardenService.get_garden_summary(user_id)
        streak = summary.get("streak", 0)
        points = summary.get("points", 0)
        today_watered = summary.get("todayWatered", False)
        care_plan = summary.get("carePlan") or {}

        # Plant level from streak (same formula as frontend)
        plant_level = 1
        if streak >= 30:
            plant_level = 4
        elif streak >= 15:
            plant_level = 3
        elif streak >= 8:
            plant_level = 2

        # Habits counts
        habits = care_plan.get("habits", [])
        active_habits = [h for h in habits if h.get("active", True)]
        habits_done_today = sum(1 for h in active_habits if h.get("done"))
        total_active_habits = len(active_habits)

        # Vouchers redeemed
        loyalty_doc = user_ref.collection("loyaltySummary").document("info").get()
        loyalty = loyalty_doc.to_dict() if loyalty_doc.exists else {}
        vouchers_redeemed = len(loyalty.get("voucherHistory", []))

        # Family count (active members, excluding self)
        family_count = 0
        try:
            profile_doc = user_ref.collection("profile").document("info").get()
            family_id = profile_doc.to_dict().get("familyId") if profile_doc.exists else None
            if family_id:
                family_doc = db.collection("families").document(family_id).get()
                if family_doc.exists:
                    members = family_doc.to_dict().get("members", [])
                    family_count = sum(1 for m in members if m.get("uid") != user_id and m.get("status") != "pending")
        except Exception:
            pass

        # Watered for others (total and this week)
        watered_for_others = 0
        watered_for_others_week = 0
        today_dt = get_vietnam_now()
        week_start = (today_dt - timedelta(days=today_dt.weekday())).strftime("%Y-%m-%d")
        try:
            events = user_ref.collection("adherenceEvents") \
                .where("eventType", "==", "water_for_family").stream()
            for evt in events:
                watered_for_others += 1
                evt_date = evt.to_dict().get("timestamp", "")[:10]
                if evt_date >= week_start:
                    watered_for_others_week += 1
        except Exception:
            pass

        # Days active this week
        week_days_active = 0
        try:
            events_all = user_ref.collection("adherenceEvents") \
                .order_by("timestamp", direction="DESCENDING").limit(30).stream()
            week_dates = set()
            for evt in events_all:
                evt_date = evt.to_dict().get("timestamp", "")[:10]
                if evt_date and evt_date >= week_start:
                    week_dates.add(evt_date)
            week_days_active = len(week_dates)
        except Exception:
            pass

        return {
            "streak": streak,
            "points": points,
            "plant_level": plant_level,
            "today_watered": 1 if today_watered else 0,
            "habits_completed_today": habits_done_today,
            "total_active_habits": total_active_habits,
            "vouchers_redeemed": vouchers_redeemed,
            "family_count": family_count,
            "watered_for_others": watered_for_others,
            "watered_for_others_week": watered_for_others_week,
            "week_days_active": week_days_active,
        }

    @staticmethod
    def get_achievements(user_id: str) -> List[Dict[str, Any]]:
        metrics = GardenService._build_user_metrics(user_id)
        result = []
        for ach in ACHIEVEMENTS_CATALOG:
            field = ach["target_field"]
            target = ach["target_value"]
            current = metrics.get(field, 0)
            unlocked = current >= target
            result.append({
                "id": ach["id"],
                "title": ach["title"],
                "desc": ach["desc"],
                "icon": ach["icon"],
                "gradient": ach["gradient"],
                "unlocked": unlocked,
                "current": min(current, target),
                "target": target,
            })
        return result

    @staticmethod
    def get_quests(user_id: str) -> List[Dict[str, Any]]:
        metrics = GardenService._build_user_metrics(user_id)
        result = []
        for q in QUESTS_CATALOG:
            field = q["target_field"]
            # dynamic target for "all habits" quest
            if q["id"] == "daily_all_habits":
                target = max(metrics.get("total_active_habits", 1), 1)
            else:
                target = q["target_value"]
            current = min(metrics.get(field, 0), target)
            done = current >= target
            result.append({
                "id": q["id"],
                "type": q["type"],
                "title": q["title"],
                "icon": q["icon"],
                "current": current,
                "target": target,
                "done": done,
                "reward": q["reward"],
            })
        return result

    @staticmethod
    def get_badges(user_id: str) -> List[Dict[str, Any]]:
        # For demo, just return some static badges if streak > 7
        summary = GardenService.get_garden_summary(user_id)
        streak = summary.get("streak", 0)
        badges = []
        if streak >= 7:
            badges.append({"id": "sprout", "name": "Mầm Xanh", "desc": "7 ngày streak"})
        if streak >= 14:
            badges.append({"id": "tree", "name": "Cây Lớn", "desc": "14 ngày streak"})
        if streak >= 30:
            badges.append({"id": "garden", "name": "Vườn Xanh", "desc": "30 ngày streak"})
        return badges

    @staticmethod
    def simulate_streak_increase(user_id: str) -> Dict[str, Any]:
        db = get_db()
        user_ref = db.collection("users").document(user_id)
        
        # 1. Get existing event dates
        events_ref = user_ref.collection("adherenceEvents").stream()
        event_dates = set()
        for doc in events_ref:
            evt = doc.to_dict()
            ts = evt.get("timestamp")
            if ts:
                if isinstance(ts, str):
                    date_str = ts.split("T")[0]
                else:
                    date_str = ts.strftime("%Y-%m-%d")
                event_dates.add(date_str)
                
        # 2. Fill in up to 7 missing dates going backward from today
        from datetime import datetime, timedelta
        now = get_vietnam_now()
        
        filled_dates = []
        for _ in range(7):
            check_date = now
            while check_date.strftime("%Y-%m-%d") in event_dates:
                check_date -= timedelta(days=1)
            
            target_date_str = check_date.strftime("%Y-%m-%d")
            
            # 3. Create a mock adherence event for that target date
            event_ref = user_ref.collection("adherenceEvents").document()
            target_timestamp = check_date.replace(hour=12, minute=0, second=0, microsecond=0)
            event_data = {
                "eventType": "water",
                "habitId": "habit-water",
                "pointsEarned": 10,
                "timestamp": target_timestamp.isoformat(),
                "simulated": True
            }
            event_ref.set(event_data)
            event_dates.add(target_date_str)
            filled_dates.append(target_date_str)
        
        # Recalculate streak
        new_streak = 0
        chk = now
        if now.strftime("%Y-%m-%d") not in event_dates:
            chk = now - timedelta(days=1)
        while chk.strftime("%Y-%m-%d") in event_dates:
            new_streak += 1
            chk -= timedelta(days=1)
            
        # 4. Calculate corresponding stage
        stage = 1
        if new_streak >= 30:
            stage = 4
        elif new_streak >= 15:
            stage = 3
        elif new_streak >= 8:
            stage = 2
            
        # 5. Update active care plan in database
        active_plan_ref = None
        for status in ["growing", "pending", "paused"]:
            care_plans = user_ref.collection("carePlans").where("plantStatus", "==", status).limit(1).stream()
            for doc in care_plans:
                active_plan_ref = doc.reference
                break
            if active_plan_ref:
                break
                
        if active_plan_ref:
            active_plan_ref.update({"plantLevel": stage})
            
        return {
            "success": True, 
            "newStreak": new_streak, 
            "plantLevel": stage, 
            "targetDate": ", ".join(filled_dates)
        }

