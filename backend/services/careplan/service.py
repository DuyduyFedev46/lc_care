"""Care Plan Service — CRUD + AI habit generation."""
import json
import re
from typing import List, Dict, Any
from datetime import datetime
from services.firebase_init import get_db
from services.careplan.habit_catalog import get_all_habits, HABIT_CATALOG



class CarePlanService:
    @staticmethod
    def get_care_plans(user_id: str) -> List[Dict[str, Any]]:
        db = get_db()
        plans = db.collection("users").document(user_id).collection("carePlans").stream()
        return [{"id": doc.id, **doc.to_dict()} for doc in plans]

    @staticmethod
    def create_care_plan(user_id: str, plan_data: Dict[str, Any]) -> Dict[str, Any]:
        db = get_db()
        plan_ref = db.collection("users").document(user_id).collection("carePlans").document()
        full_data = {**plan_data, "createdAt": datetime.now().isoformat()}
        plan_ref.set(full_data)
        return {"success": True, "id": plan_ref.id, "plan": full_data}

    @staticmethod
    def update_care_plan(user_id: str, plan_id: str, plan_data: Dict[str, Any]) -> Dict[str, Any]:
        db = get_db()
        plan_ref = db.collection("users").document(user_id).collection("carePlans").document(plan_id)
        plan_ref.update(plan_data)
        return {"success": True}

    @staticmethod
    def generate_habits(user_id: str, plant_group: str, profile: Dict[str, Any], lang: str = "vi") -> List[Dict[str, Any]]:
        """Generate personalized habits via AI. Falls back to catalog defaults if AI fails."""
        base_habits = get_all_habits(plant_group)
        catalog_entry = HABIT_CATALOG.get(plant_group, HABIT_CATALOG["G1"])

        # Try AI personalization
        try:
            from ai.prompt_manager import prompt_manager
            from ai.client import ai_client
            from ai.guardrails import validate_ai_response

            age = datetime.now().year - int(profile.get("yearOfBirth", 1990))
            bad_habit_labels = {
                "latenight": "Thức khuya", "alcohol": "Rượu bia",
                "unhealthy_eating": "Ăn vội vàng", "stress": "Hay căng thẳng",
                "smoking": "Hút thuốc", "skip_meals": "Bỏ bữa",
                "sleep_late": "Ngủ muộn", "ok": "Sống lành mạnh",
            }
            exercise_labels = {"active": "Tích cực", "sometimes": "Thỉnh thoảng", "sedentary": "Ít vận động", "starting": "Mới bắt đầu"}
            care_for_labels = {"self": "Bản thân", "child": "Con cái", "parents": "Bố mẹ", "family": "Cả gia đình"}

            bad_habits_str = ", ".join(bad_habit_labels.get(h, h) for h in profile.get("badHabits", [])) or "Không có"
            life_changes_str = ", ".join(profile.get("lifeChanges", [])) or "Không có"

            prompt = prompt_manager.render("careplan_habits", {
                "plant_group": plant_group,
                "journey_label": catalog_entry.get("label", "Chăm sóc sức khỏe"),
                "gender": "Nam" if profile.get("gender") == "male" else "Nữ",
                "age": str(age),
                "health_status": profile.get("healthStatus", "healthy"),
                "bad_habits": bad_habits_str,
                "life_changes": life_changes_str,
                "exercise": exercise_labels.get(profile.get("exercise", "sometimes"), "Thỉnh thoảng"),
                "care_for": care_for_labels.get(profile.get("careFor", "self"), "Bản thân"),
                "habits_json": json.dumps(base_habits, ensure_ascii=False, indent=2),
            }, lang=lang)

            raw = ai_client.chat(prompt, lang=lang)

            # Validate guardrails
            is_safe, violations = validate_ai_response(raw, lang=lang)
            if not is_safe:
                print(f"[habits] Guardrail violations, using catalog: {violations}")
                return base_habits

            # Extract JSON from response
            match = re.search(r'\[.*\]', raw, re.DOTALL)
            if match:
                ai_habits = json.loads(match.group())
                # Validate structure minimally
                if isinstance(ai_habits, list) and len(ai_habits) > 0 and "id" in ai_habits[0]:
                    # Ensure max 3 active
                    active_count = 0
                    for h in ai_habits:
                        if h.get("active") and active_count < 3:
                            h["active"] = True
                            h["done"] = False
                            active_count += 1
                        elif h.get("active"):
                            h["active"] = False
                            h["done"] = False
                    return ai_habits

        except Exception as e:
            print(f"[habits] AI generation failed, using catalog: {e}")

        # Fallback: catalog defaults
        return base_habits

    @staticmethod
    def update_habit(user_id: str, plan_id: str, habit_id: str, patch: Dict[str, Any]) -> Dict[str, Any]:
        """Toggle habit active state or mark done. Used for KH self-customize."""
        db = get_db()
        plan_ref = db.collection("users").document(user_id).collection("carePlans").document(plan_id)
        plan = plan_ref.get().to_dict()
        if not plan:
            return {"success": False, "error": "Plan not found"}

        habits = plan.get("habits", [])
        updated = False
        for h in habits:
            if h.get("id") == habit_id:
                h.update(patch)
                updated = True
                break

        if updated:
            plan_ref.update({"habits": habits})

        return {"success": updated, "habits": habits}

    @staticmethod
    def add_custom_habit(user_id: str, plan_id: str, habit: Dict[str, Any]) -> Dict[str, Any]:
        """KH tự thêm habit cá nhân."""
        import uuid
        db = get_db()
        plan_ref = db.collection("users").document(user_id).collection("carePlans").document(plan_id)
        plan = plan_ref.get().to_dict()
        if not plan:
            return {"success": False, "error": "Plan not found"}

        habits = plan.get("habits", [])
        new_habit = {
            "id": f"custom_{uuid.uuid4().hex[:8]}",
            "name": habit.get("name", "Habit mới"),
            "time": habit.get("time", "Cả ngày"),
            "icon": "ui_note_pencil",
            "points": 10,
            "active": True,
            "done": False,
            "isCustom": True,
        }
        habits.append(new_habit)
        plan_ref.update({"habits": habits})

        # Audit log
        db.collection("medical_audit_log").add({
            "action": "custom_habit_added",
            "userId": user_id,
            "planId": plan_id,
            "habitName": new_habit["name"],
            "timestamp": datetime.now().isoformat(),
        })

        return {"success": True, "habit": new_habit, "habits": habits}
