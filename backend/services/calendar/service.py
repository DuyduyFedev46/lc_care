"""Family Calendar Service — AI-powered family schedule suggestions"""
from typing import List, Dict, Any
from datetime import datetime, timedelta
from services.firebase_init import get_db
from ai.client import ai_client
from ai.prompt_manager import prompt_manager
from ai.guardrails import validate_ai_response, log_ai_output


class CalendarService:
    @staticmethod
    def get_family_suggestions(family_id: str) -> List[Dict[str, Any]]:
        """Generate AI-powered batch suggestions for a family's calendar."""
        db = get_db()

        # 1. Get family members
        family_doc = db.collection("families").document(family_id).get()
        if not family_doc.exists:
            return []
        family_data = family_doc.to_dict()
        member_ids = family_data.get("members", [])

        # 2. Aggregate upcoming events per member
        member_summaries = []
        lang = "vi"  # default; overridden by first member's profile lang
        for uid in member_ids:
            user_ref = db.collection("users").document(uid)
            profile_doc = user_ref.collection("profile").document("info").get()
            profile = profile_doc.to_dict() if profile_doc.exists else {}

            # Use first member's lang as family lang (all members typically same)
            if not member_summaries:
                lang = profile.get("lang", "vi")

            # Check refill dates
            plans = [d.to_dict() for d in user_ref.collection("carePlans").stream()]
            adherence = [d.to_dict() for d in user_ref.collection("adherenceEvents")
                         .order_by("timestamp", direction="DESCENDING")
                         .limit(7).stream()]

            member_summaries.append({
                "name": profile.get("fullName", uid),
                "activePlans": len(plans),
                "recentAdherence": len(adherence),
            })

        # 3. Generate AI suggestions — summary text in lang
        if lang == "ja":
            summary_text = "\n".join(
                f"- {m['name']}: {m['activePlans']}件のプラン、先週{m['recentAdherence']}回服薬"
                for m in member_summaries
            )
            fallback_text = "ご家族の健康スケジュールは順調です。引き続き継続してください！"
        else:
            summary_text = "\n".join(
                f"- {m['name']}: {m['activePlans']} kế hoạch, {m['recentAdherence']} lần tuân thủ tuần qua"
                for m in member_summaries
            )
            fallback_text = "Gia đình bạn đang có lịch trình sức khỏe tốt. Hãy tiếp tục duy trì nhé!"

        try:
            prompt = prompt_manager.render("insight_cross_member", {
                "family_summary": summary_text,
                "num_members": str(len(member_summaries)),
            }, lang=lang)
            text = ai_client.chat(prompt, lang=lang)
            is_safe, violations = validate_ai_response(text, lang=lang)
            log_ai_output(family_id, "calendar_suggestion", text, is_safe, violations)

            if not is_safe:
                text = fallback_text

            # Save suggestion
            suggestion = {
                "familyId": family_id,
                "content": text,
                "memberCount": len(member_summaries),
                "generatedAt": datetime.now().isoformat(),
                "read": False,
            }
            db.collection("calendarSuggestions").add(suggestion)
            return [suggestion]
        except Exception as e:
            print(f"Calendar suggestion failed: {e}")
            return []

    @staticmethod
    def get_suggestions_history(family_id: str) -> List[Dict[str, Any]]:
        """Get past calendar suggestions for a family."""
        db = get_db()
        docs = (
            db.collection("calendarSuggestions")
            .where("familyId", "==", family_id)
            .order_by("generatedAt", direction="DESCENDING")
            .limit(10)
            .stream()
        )
        return [{"id": doc.id, **doc.to_dict()} for doc in docs]
