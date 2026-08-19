"""Onboarding Service — save profile, assign plant, create care plan"""
from typing import Dict, Any, List
from datetime import datetime
import time as _time
from services.firebase_init import get_db
from shared.validation import HEALTH_STATUS, CHRONIC_SUB_CONDITIONS, BAD_HABITS, LIFE_CHANGES, GENDERS, YEAR_MIN, YEAR_MAX

# ── Firestore-backed PLANT_GROUPS with cache ─────────────────────────────
_pg_cache: Dict[str, Any] = {}
_pg_cache_ts: float = 0
_PG_TTL = 300  # 5 minutes

# Hardcoded fallback (only used if Firestore is empty)
_FALLBACK_PLANT_GROUPS = {
    "G1":  {"plant": "mint",        "label": "Bạc Hà",      "emoji": "🌿", "needsPharmacist": False},
    "G2":  {"plant": "ginger",      "label": "Gừng",         "emoji": "🫚", "needsPharmacist": True},
    "G3":  {"plant": "bittermelon", "label": "Khổ Qua",      "emoji": "🥒", "needsPharmacist": True},
    "G4":  {"plant": "lotus",       "label": "Sen",           "emoji": "🪷", "needsPharmacist": False},
    "G5":  {"plant": "basil",       "label": "Húng Quế",      "emoji": "🌿", "needsPharmacist": False},
    "G6":  {"plant": "aloe",        "label": "Lô Hội",        "emoji": "🪴", "needsPharmacist": False},
    "G7":  {"plant": "turmeric",    "label": "Nghệ",          "emoji": "🟡", "needsPharmacist": True},
    "G8":  {"plant": "lavender",    "label": "Oải Hương",     "emoji": "🪻", "needsPharmacist": True},
    "G9":  {"plant": "ginseng",     "label": "Nhân Sâm",      "emoji": "🥔", "needsPharmacist": False},
    "G10": {"plant": "pennywort",   "label": "Rau Má",        "emoji": "🌾", "needsPharmacist": False},
    "G11": {"plant": "licorice",   "label": "Cam Thảo",      "emoji": "🌿", "needsPharmacist": False},
    "G12": {"plant": "lemongrass",  "label": "Sả",            "emoji": "🌿", "needsPharmacist": False},
    "G13": {"plant": "eucommia",    "label": "Đỗ Trọng",      "emoji": "🌳", "needsPharmacist": True},
    "G14": {"plant": "phyllanthus", "label": "Diệp Hạ Châu",  "emoji": "🌿", "needsPharmacist": True},
    "G15": {"plant": "tea",         "label": "Lá Trà",        "emoji": "🍵", "needsPharmacist": True},
}

def _load_plant_groups() -> Dict[str, Any]:
    global _pg_cache, _pg_cache_ts
    if _time.time() - _pg_cache_ts < _PG_TTL and _pg_cache:
        return _pg_cache
    try:
        db = get_db()
        docs = db.collection("plantGroups").stream()
        result = {doc.id: doc.to_dict() for doc in docs}
        if result:
            _pg_cache = result
            _pg_cache_ts = _time.time()
            return _pg_cache
    except Exception as e:
        print(f"[onboarding] Firestore plantGroups read failed: {e}")
    if not _pg_cache:
        _pg_cache = _FALLBACK_PLANT_GROUPS
        _pg_cache_ts = _time.time()
    return _pg_cache


class _PlantGroupsProxy:
    """Dict-like proxy that loads plant groups from Firestore on access."""
    def get(self, key, default=None):
        return _load_plant_groups().get(key, default)
    def __getitem__(self, key):
        return _load_plant_groups()[key]
    def __contains__(self, key):
        return key in _load_plant_groups()
    def items(self):
        return _load_plant_groups().items()
    def keys(self):
        return _load_plant_groups().keys()
    def values(self):
        return _load_plant_groups().values()

PLANT_GROUPS = _PlantGroupsProxy()

# ── Firestore-backed DISEASE_TO_PLANT with cache ─────────────────────────
_dtp_cache: Dict[str, str] = {}
_dtp_cache_ts: float = 0

_FALLBACK_DISEASE_TO_PLANT = {
    "diabetes": "bittermelon",
    "hypertension": "ginger",
    "cholesterol": "tea",
    "bone_joint": "eucommia",
    "digestive": "phyllanthus",
}

def _load_disease_to_plant() -> Dict[str, str]:
    global _dtp_cache, _dtp_cache_ts
    if _time.time() - _dtp_cache_ts < _PG_TTL and _dtp_cache:
        return _dtp_cache
    try:
        db = get_db()
        docs = db.collection("diseaseToPlant").stream()
        result = {doc.id: doc.to_dict().get("plantType", "") for doc in docs}
        if result:
            _dtp_cache = result
            _dtp_cache_ts = _time.time()
            return _dtp_cache
    except Exception as e:
        print(f"[onboarding] Firestore diseaseToPlant read failed: {e}")
    if not _dtp_cache:
        _dtp_cache = _FALLBACK_DISEASE_TO_PLANT
        _dtp_cache_ts = _time.time()
    return _dtp_cache


class _DiseaseToPlantProxy:
    def get(self, key, default=None):
        return _load_disease_to_plant().get(key, default)
    def __getitem__(self, key):
        return _load_disease_to_plant()[key]
    def __contains__(self, key):
        return key in _load_disease_to_plant()
    def items(self):
        return _load_disease_to_plant().items()

DISEASE_TO_PLANT = _DiseaseToPlantProxy()

# MEDICAL_GROUPS derived from plant groups (needsPharmacist == True)
def _get_medical_groups() -> set:
    pg = _load_plant_groups()
    return {gid for gid, gdata in pg.items() if gdata.get("needsPharmacist")}

MEDICAL_GROUPS = _get_medical_groups()

def assign_plant(profile: Dict[str, Any]) -> Dict[str, Any]:
    """Rule-based plant assignment — mirrors frontend plantAssignment.js"""
    health = profile.get("healthStatus", "healthy")
    age = datetime.now().year - int(profile.get("yearOfBirth", 1990))
    exercise = profile.get("exercise", "sometimes")
    care_for = profile.get("careFor", "self")
    subs = profile.get("chronicSubConditions", [])

    # Medical
    if health == "chronic" and subs:
        sub_id = subs[0]
        plant_key = DISEASE_TO_PLANT.get(sub_id, "bittermelon")
        matching = [(k, v) for k, v in PLANT_GROUPS.items() if v["plant"] == plant_key]
        if matching:
            gid, gdata = matching[0]
            return {**gdata, "group": gid}
        return {**PLANT_GROUPS["G3"], "group": "G3"}

    if health == "mental":
        return {**PLANT_GROUPS["G8"], "group": "G8"}
    if health == "recovery":
        return {**PLANT_GROUPS["G7"], "group": "G7"}
    if health == "monitoring":
        return {**PLANT_GROUPS["G2"], "group": "G2"}

    # Life stage
    if health == "pregnant":
        return {**PLANT_GROUPS["G4"], "group": "G4"}
    if age < 18:
        return {**PLANT_GROUPS["G5"], "group": "G5"}
    if age >= 60:
        return {**PLANT_GROUPS["G6"], "group": "G6"}

    # Lifestyle
    if exercise == "active":
        return {**PLANT_GROUPS["G9"], "group": "G9"}
    if care_for == "family":
        return {**PLANT_GROUPS["G11"], "group": "G11"}
    if exercise == "sedentary":
        return {**PLANT_GROUPS["G10"], "group": "G10"}

    return {**PLANT_GROUPS["G1"], "group": "G1"}


class OnboardingService:
    @staticmethod
    def submit(user_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        db = get_db()
        user_ref = db.collection("users").document(user_id)
        today = datetime.now()
        lang = data.get("lang", "vi")
        profile = data.get("userProfile", {})
        
        health_status = profile.get("healthStatus", "healthy")
        if health_status not in HEALTH_STATUS:
            health_status = "healthy"
            
        gender = profile.get("gender")
        if gender and gender not in GENDERS:
            profile["gender"] = "unknown"
            
        try:
            year_of_birth = int(profile.get("yearOfBirth", 1990))
            if not (YEAR_MIN <= year_of_birth <= YEAR_MAX):
                year_of_birth = 1990
        except (ValueError, TypeError):
            year_of_birth = 1990
        profile["yearOfBirth"] = year_of_birth

        # Filter out invalid list entries
        profile["chronicSubConditions"] = [c for c in profile.get("chronicSubConditions", []) if c in CHRONIC_SUB_CONDITIONS]
        profile["badHabits"] = [h for h in profile.get("badHabits", []) if h in BAD_HABITS]
        profile["lifeChanges"] = [c for c in profile.get("lifeChanges", []) if c in LIFE_CHANGES]

        # 1. Save profile
        user_ref.collection("profile").document("info").set({
            **profile,
            "lang": lang,
            "createdAt": today.isoformat(),
        }, merge=True)

        # 2. Save health conditions
        subs = profile.get("chronicSubConditions", [])
        if health_status == "chronic" and subs:
            for i, sub_id in enumerate(subs):
                user_ref.collection("healthConditions").document(f"cond-{i+1}").set({
                    "condition": "chronic",
                    "subCondition": sub_id,
                    "source": "self_report",
                    "createdAt": today.isoformat(),
                })

        # 3. Assign plant — prefer user's choice if valid, otherwise rule-based
        user_plant_choice = (data.get("assignedPlants") or {}).get("primary")
        plant = None
        if user_plant_choice and isinstance(user_plant_choice, dict):
            chosen_group = user_plant_choice.get("group")
            if chosen_group and chosen_group in PLANT_GROUPS:
                pg = PLANT_GROUPS[chosen_group]
                plant = {**pg, "group": chosen_group}
        if plant is None:
            plant = assign_plant(profile)
        needs_pharmacist = plant["group"] in _get_medical_groups()

        # 4. Create initial care plan
        from services.careplan.service import CarePlanService
        habits = []
        if not needs_pharmacist:
            # Auto-approve: AI generates habits immediately
            habits = CarePlanService.generate_habits(user_id, plant["group"], profile, lang=lang)

        # Include OCR results in care plan for persistence
        ocr_results_raw = data.get("ocrResults", {})
        plan_data = {
            "journeyType": "general",
            "journeyLabel": f"Hành trình {plant['label']}",
            "plantType": plant["plant"],
            "plantLevel": 1,
            "plantStatus": "growing" if not needs_pharmacist else "pending",
            "plantGroup": plant["group"],
            "plantLabel": plant["label"],
            "plantEmoji": plant["emoji"],
            "conditionSource": "self_report",
            "conditionVerifiedBy": None,
            "pharmacistApproved": not needs_pharmacist,
            "needsPharmacist": needs_pharmacist,
            "habits": habits,
            "habitSource": "ai_generated" if not needs_pharmacist else "pending_pharmacist",
            "stageNames": ["Chờ duyệt", "Mầm non", "Cây non", "Trưởng thành", "Đang nụ", "Nở hoa"],
            "ocrResults": ocr_results_raw if ocr_results_raw else {},
            "createdAt": today.isoformat(),
        }
        user_ref.collection("carePlans").document("plan-1").set(plan_data)


        # 5. Save family members if provided
        family_members = data.get("familyMembers", [])
        if family_members:
            for m in family_members:
                mid = m.get("id", f"m-{datetime.now().timestamp()}")
                user_ref.collection("familyMembers").document(str(mid)).set(m)

        # 6. Generate customer-facing onboarding summary
        gender = profile.get("gender", "Chưa rõ")
        year_of_birth = profile.get("yearOfBirth", "Chưa rõ")
        health_status = profile.get("healthStatus", "healthy")
        
        health_labels = {
            "healthy": "Khỏe mạnh",
            "monitoring": "Cần theo dõi sức khỏe",
            "chronic": "Đang dùng thuốc mãn tính",
            "mental": "Sức khỏe tinh thần",
            "pregnant": "Mang thai / Sau sinh",
            "recovery": "Đang hồi phục"
        }
        health_labels_ja = {
            "healthy": "健康",
            "monitoring": "要観察",
            "chronic": "慢性疾患管理中",
            "mental": "メンタルヘルス",
            "pregnant": "妊娠中／産後",
            "recovery": "回復期"
        }
        condition_labels = {
            "diabetes": "Tiểu đường", "hypertension": "Huyết áp",
            "cholesterol": "Mỡ máu", "bone_joint": "Xương khớp",
            "digestive": "Tiêu hóa / Gan",
        }
        condition_labels_ja = {
            "diabetes": "糖尿病", "hypertension": "高血圧",
            "cholesterol": "高脂血症", "bone_joint": "骨・関節",
            "digestive": "消化器系"
        }
        habit_labels = {
            "latenight": "Hay thức khuya", "alcohol": "Rượu bia",
            "unhealthy_eating": "Ăn vội vàng", "stress": "Hay căng thẳng",
            "smoking": "Hút thuốc", "skip_meals": "Bỏ bữa",
            "sleep_late": "Ngủ muộn", "ok": "Sống lành mạnh",
        }
        habit_labels_ja = {
            "latenight": "就寝時間を過ぎる", "alcohol": "飲酒",
            "unhealthy_eating": "不規則な食事", "stress": "ストレスが多い",
            "smoking": "喫煙", "skip_meals": "欠食",
            "sleep_late": "就寝が遅い", "ok": "健康的な生活",
        }
        life_change_labels = {
            "job": "Bắt đầu công việc mới", "move": "Chuyển nơi ở",
            "pregnant": "Mang thai", "baby": "Vừa chào đón em bé",
            "retired": "Bắt đầu nghỉ hưu", "travel": "Đi công tác / nước ngoài",
            "none": "Không có thay đổi lớn",
        }
        life_change_labels_ja = {
            "job": "新しい仕事を開始", "move": "引っ越し",
            "pregnant": "妊娠中", "baby": "新生児誕生",
            "retired": "退職", "travel": "出張・海外活動",
            "none": "大きな変化なし",
        }

        # Select label maps by lang
        _hl = health_labels_ja if lang == "ja" else health_labels
        _cl = condition_labels_ja if lang == "ja" else condition_labels
        _bl = habit_labels_ja if lang == "ja" else habit_labels
        _ll = life_change_labels_ja if lang == "ja" else life_change_labels
        _none_label = "なし" if lang == "ja" else "Không có"

        def map_codes(codes, label_map):
            return ", ".join(label_map.get(c, c) for c in codes) if codes else _none_label

        health_status_label = _hl.get(health_status, health_status)
        chronic_labels = map_codes(profile.get("chronicSubConditions", []), _cl)
        habit_labels_str = map_codes(profile.get("badHabits", []), _bl)
        life_labels_str = map_codes(profile.get("lifeChanges", []), _ll)
        
        # Format OCR results
        ocr_results = data.get("ocrResults", {})
        ocr_parts = []
        for doc_id, res in ocr_results.items():
            doc_label = doc_id
            if lang == "ja":
                if doc_id in ("rx", "prescription"): doc_label = "処方箋"
                elif doc_id in ("lab", "lab_result"): doc_label = "検査結果"
                elif doc_id in ("book", "medical_book"): doc_label = "診察歴"
                elif doc_id in ("echo", "ultrasound"): doc_label = "超音波"
                elif doc_id in ("vacc", "vaccination"): doc_label = "ワクチン接種"
            else:
                if doc_id in ("rx", "prescription"): doc_label = "Đơn thuốc"
                elif doc_id in ("lab", "lab_result"): doc_label = "Xét nghiệm"
                elif doc_id in ("book", "medical_book"): doc_label = "Sổ khám"
                elif doc_id in ("echo", "ultrasound"): doc_label = "Siêu âm"
                elif doc_id in ("vacc", "vaccination"): doc_label = "Tiêm chủng"
            
            meds_str = ", ".join([m.get("name", "") for m in res.get("medications", [])])
            metrics_str = ", ".join([f"{k}: {v}" for k, v in res.get("metrics", {}).items()])
            
            part = f"- {doc_label}: "
            if meds_str:
                part += f"薄め [{meds_str}] " if lang == "ja" else f"Thuốc [{meds_str}] "
            if metrics_str:
                part += f"指標 [{metrics_str}] " if lang == "ja" else f"Chỉ số [{metrics_str}] "
            if not meds_str and not metrics_str:
                _raw = res.get('raw_text', '')[:100]
                part += f"抽出テキスト: {_raw}..." if lang == "ja" else f"Văn bản trích xuất: {_raw}..."
            ocr_parts.append(part)
        if lang == "ja":
            ocr_summary_str = "\n".join(ocr_parts) if ocr_parts else "処方箋・医療書類のアップロードなし"
        else:
            ocr_summary_str = "\n".join(ocr_parts) if ocr_parts else "Chưa tải lên đơn thuốc/giấy tờ y tế."

        ai_summary = None
        try:
            from ai.prompt_manager import prompt_manager
            from ai.client import ai_client
            from ai.guardrails import validate_ai_response

            prompt = prompt_manager.render("customer_summary", {
                "gender": "男性" if gender == "male" else "女性" if gender == "female" else "その他" if lang == "ja" else ("Nam" if gender == "male" else "Nữ" if gender == "female" else "Khác"),
                "year_of_birth": str(year_of_birth),
                "health_status": health_status_label,
                "chronic_conditions": chronic_labels,
                "bad_habits": habit_labels_str,
                "life_changes": life_labels_str,
                "ocr_results": ocr_summary_str,
                "health_status_label": health_status_label,
            }, lang=lang)
            ai_summary = ai_client.chat(prompt, lang=lang)
            # Ensure safety — reject if guardrails fail
            is_safe, violations = validate_ai_response(ai_summary, lang=lang)
            from ai.guardrails import log_ai_output
            log_ai_output(user_id, "customer_summary", ai_summary, is_safe, violations)
            if not is_safe:
                print(f"Guardrail violations: {violations}")
                if lang == "ja":
                    ai_summary = (
                        f"🌱 Long Chau Careがお客様の健康プロフィールを受け取りました。\n\n"
                        f"📋 状態: {health_status_label}。\n"
                        f"お薬: {chronic_labels}。\n\n"
                        f"👨‍⚕️ Long Chauの薬剤師がプロフィールを確認し、最終判断を行います。"
                    )
                else:
                    ai_summary = (
                        f"🌱 Chào bạn! Long Châu Care đã ghi nhận hồ sơ sức khỏe của bạn.\n\n"
                        f"📋 Trạng thái: {health_status_label}.\n"
                        f"Quan tâm: {chronic_labels}.\n"
                        f"Thói quen cần cải thiện: {habit_labels_str}.\n\n"
                        f"👨‍⚕️ Dược sĩ Long Châu sẽ xem xét hồ sơ và thiết kế Kế hoạch Chăm sóc riêng biệt cho bạn."
                    )
        except Exception as e:
            print(f"Summary generation failed: {e}")
            if lang == "ja":
                ai_summary = (
                    f"🌱 Long Chau Careがお客様の健康プロフィールを受け取りました。\n\n"
                    f"📋 状態: {health_status_label}。\n"
                    f"お薬: {chronic_labels}。\n\n"
                    f"👨‍⚕️ Long Chauの薬剤師がプロフィールを確認し、最終判断を行います。"
                )
            else:
                ai_summary = (
                    f"🌱 Chào bạn! Long Châu Care đã ghi nhận hồ sơ sức khỏe của bạn.\n\n"
                    f"📋 Trạng thái: {health_status_label}.\n"
                    f"Quan tâm: {chronic_labels}.\n"
                    f"Thói quen cần cải thiện: {habit_labels_str}.\n\n"
                    f"👨‍⚕️ Dược sĩ sẽ xem xét và thiết kế Kế hoạch Chăm sóc phù hợp nhất cho bạn."
                )

        # Update care plan with AI summary so returning users can see it
        if ai_summary:
            try:
                user_ref.collection("carePlans").document("plan-1").update({"aiSummary": ai_summary})
            except Exception:
                pass

        # 7. If needs pharmacist, add to queue
        if needs_pharmacist:
            db.collection("pharmacistQueue").document(f"draft-{user_id}").set({
                "userId": user_id,
                "status": "pending",
                "priority": "medium",
                "plantGroup": plant["group"],
                "plantType": plant["plant"],
                "plantLabel": plant["label"],
                "healthStatus": health_status,
                "chronicSubConditions": subs,
                "aiSummary": ai_summary,
                "submittedAt": today.isoformat(),
            })

        # 8. Init loyalty
        loyalty_ref = user_ref.collection("loyaltySummary").document("info")
        if not loyalty_ref.get().exists:
            loyalty_ref.set({
                "totalPoints": 0,
                "familyPoints": 0,
                "tier": "Bronze",
                "voucherHistory": [],
            })
            
        # 9. Medical Audit Log
        db.collection("medical_audit_log").add({
            "action": "onboarding_completed",
            "userId": user_id,
            "assignedPlant": plant["plant"],
            "needsPharmacist": needs_pharmacist,
            "timestamp": today.isoformat()
        })

        return {
            "plant": plant,
            "approvalStatus": "auto_approved" if not needs_pharmacist else "pending_review",
            "needsPharmacist": needs_pharmacist,
            "aiSummary": ai_summary,
            "habits": habits,
            "planId": "plan-1",
        }

    @staticmethod
    def get_status(user_id: str) -> Dict[str, Any]:
        db = get_db()
        user_ref = db.collection("users").document(user_id)

        plans = [doc.to_dict() for doc in user_ref.collection("carePlans").stream()]
        active_plan = plans[0] if plans else None

        if not active_plan:
            return {"status": "not_started"}

        if active_plan.get("pharmacistApproved"):
            return {"status": "approved", "plant": active_plan}

        return {"status": "pending_review", "plant": active_plan}
