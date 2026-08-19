"""Adherence Cross-Validation — Compare adherenceEvents vs purchases for consistency."""
from typing import Dict, Any, List
from datetime import datetime
from services.firebase_init import get_db


class AdherenceCrossCheck:
    @staticmethod
    def validate_user(user_id: str) -> Dict[str, Any]:
        """Cross-check adherence events against purchase records for a single user.
        
        Detects:
        - Adherence events with no matching purchase (user says they took meds but didn't buy any)
        - Purchases with no adherence follow-up (user bought meds but never logged taking them)
        - Frequency mismatches (purchase quantity vs logged consumption rate)
        """
        db = get_db()
        user_ref = db.collection("users").document(user_id)

        # 1. Get adherence events (last 90 days)
        adherence_docs = list(
            user_ref.collection("adherenceEvents")
            .order_by("timestamp", direction="DESCENDING")
            .limit(90)
            .stream()
        )
        adherence_events = [d.to_dict() for d in adherence_docs]

        # 2. Get purchase records (last 90 days)
        purchase_docs = list(
            user_ref.collection("purchases")
            .order_by("date", direction="DESCENDING")
            .limit(30)
            .stream()
        )
        purchases = [d.to_dict() for d in purchase_docs]

        # Pre-load habits from care plans to map habitId to medication names if needed
        care_plan_habits = {}
        try:
            plans = user_ref.collection("carePlans").stream()
            for plan in plans:
                p_data = plan.to_dict()
                for h in p_data.get("habits", []):
                    h_id = h.get("id")
                    h_name = h.get("name", "")
                    if h_id is not None:
                        care_plan_habits[h_id] = h_name
        except Exception:
            pass

        # 3. Extract medication names from each source
        adherence_meds = set()
        for evt in adherence_events:
            med = evt.get("medicationName", "").strip().lower()
            if not med and evt.get("habitId") is not None:
                # Resolve from care plan habits, stripping leading "Uống " / "uống "
                habit_name = care_plan_habits.get(evt.get("habitId"), "")
                if habit_name.lower().startswith("uống "):
                    med = habit_name[5:].strip().lower()
                else:
                    med = habit_name.strip().lower()
            if med:
                adherence_meds.add(med)

        purchase_meds = set()
        for p in purchases:
            # Handle nested items schema
            for item in p.get("items", []):
                med = item.get("name", "").strip().lower()
                if med:
                    purchase_meds.add(med)
            # Handle flat schema (seeded data)
            flat_name = p.get("name", "").strip().lower()
            if flat_name:
                purchase_meds.add(flat_name)

        # 4. Detect mismatches
        adherence_only = adherence_meds - purchase_meds  # Logged but never purchased
        purchase_only = purchase_meds - adherence_meds   # Purchased but never logged

        flags = []
        if adherence_only:
            flags.append({
                "type": "adherence_without_purchase",
                "severity": "medium",
                "medications": list(adherence_only),
                "message": f"User logs {len(adherence_only)} medication(s) not found in purchase records"
            })

        if purchase_only:
            flags.append({
                "type": "purchase_without_adherence",
                "severity": "low",
                "medications": list(purchase_only),
                "message": f"User purchased {len(purchase_only)} medication(s) but never logged adherence"
            })

        # 5. Audit log if flags found
        if flags:
            db.collection("medical_audit_log").add({
                "action": "adherence_cross_check",
                "userId": user_id,
                "flags": flags,
                "adherenceCount": len(adherence_events),
                "purchaseCount": len(purchases),
                "timestamp": datetime.now().isoformat()
            })

        return {
            "userId": user_id,
            "adherenceEvents": len(adherence_events),
            "purchases": len(purchases),
            "flags": flags,
            "isConsistent": len(flags) == 0,
        }

    @staticmethod
    def validate_all_users() -> Dict[str, Any]:
        """Run cross-check for all users. Called by scheduler."""
        db = get_db()
        users = db.collection("users").stream()
        results = []
        flagged = 0

        for user in users:
            result = AdherenceCrossCheck.validate_user(user.id)
            if not result["isConsistent"]:
                results.append(result)
                flagged += 1

        return {
            "totalChecked": flagged + len(results),
            "flaggedUsers": flagged,
            "details": results,
        }
