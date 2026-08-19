from typing import List, Dict, Any
from datetime import datetime
from services.firebase_init import get_db

# Guardrail #4: ONLY non-Rx items allowed
# Prescription drugs (thuốc kê đơn) are STRICTLY FORBIDDEN from voucher list
VOUCHER_WHITELIST = {
    "lab", "vacc", "supp", "bandages", "saline",
    "glucometer", "bp_monitor", "glucerna_milk", "probiotic",
}

# Targeted vouchers by plant type — NEVER include Rx drugs
# Multi-lang key-based: `key` là slug ổn định; frontend dịch title/desc/discount qua
# locale (tv_<key>_title/desc/discount). title/desc/discount giữ tiếng Việt làm fallback.
PLANT_VOUCHER_MAP: Dict[str, List[Dict]] = {
    "ginger": [  # Huyết áp / tim mạch
        {
            "id": "bp_monitor", "key": "tv_bp_monitor", "icon": "🩺",
            "title": "Máy đo huyết áp Omron",
            "desc": "Giảm 15% — Theo dõi huyết áp tại nhà tiện lợi",
            "cost": 400, "tag": "gold", "discount": "15%",
        },
        {
            "id": "lab", "key": "tv_lab_lipid", "icon": "🧪",
            "title": "Xét nghiệm Lipid máu + Creatinin",
            "desc": "Gói xét nghiệm Long Châu Lab — Kiểm tra tim mạch định kỳ",
            "cost": 500, "tag": "gold", "discount": "Ưu tiên đặt lịch",
        },
    ],
    "bittermelon": [  # Tiểu đường
        {
            "id": "glucometer", "key": "tv_glucometer", "icon": "🩸",
            "title": "Que thử đường huyết Accu-Chek x50",
            "desc": "Giảm 10% — Theo dõi đường huyết hàng ngày",
            "cost": 300, "tag": "gold", "discount": "10%",
        },
        {
            "id": "glucerna_milk", "key": "tv_glucerna", "icon": "🥛",
            "title": "Sữa Glucerna 900g (Tiểu đường)",
            "desc": "Sữa dinh dưỡng chuyên biệt — Kiểm soát đường huyết",
            "cost": 350, "tag": "gold", "discount": "8%",
        },
    ],
    "lavender": [  # Giấc ngủ / căng thẳng
        {
            "id": "supp", "key": "tv_omega3", "icon": "🐟",
            "title": "Omega-3 Fish Oil 1000mg x60",
            "desc": "Hỗ trợ giấc ngủ và giảm căng thẳng",
            "cost": 300, "tag": "gold", "discount": "Giảm 30.000đ",
        },
    ],
    "default": [
        {
            "id": "probiotic", "key": "tv_probiotic", "icon": "🦠",
            "title": "Men vi sinh Probiotics x30",
            "desc": "Tăng cường miễn dịch — Hỗ trợ tiêu hoá",
            "cost": 300, "tag": "gold", "discount": "Giảm 20.000đ",
        },
        {
            "id": "vacc", "key": "tv_vacc", "icon": "💉",
            "title": "Gói tiêm cúm + phế cầu",
            "desc": "Giảm 50.000đ — Đặt lịch tại Long Châu",
            "cost": 500, "tag": "gold", "discount": "50.000đ",
        },
    ],
}

ALL_VOUCHERS = [
    {"id": "lab",  "icon": "🧪", "type": "Long Châu Lab",  "desc": "Xét nghiệm HbA1c + Lipid máu", "cost": 500},
    {"id": "vacc", "icon": "💉", "type": "Tiêm chủng",     "desc": "Giảm 50.000đ gói cúm + phế cầu", "cost": 500},
    {"id": "supp", "icon": "🐟", "type": "TPCN",           "desc": "Giảm 30.000đ Omega-3 Fish Oil",  "cost": 300},
]


class VoucherService:
    @staticmethod
    def get_vouchers(user_id: str) -> List[Dict[str, Any]]:
        db = get_db()
        history_doc = db.collection("users").document(user_id).collection("loyaltySummary").document("info").get()
        redeemed_ids = []
        if history_doc.exists:
            history = history_doc.to_dict().get("voucherHistory", [])
            redeemed_ids = [v.get("id") for v in history]

        vouchers = [{**v} for v in ALL_VOUCHERS]
        for v in vouchers:
            v["redeemed"] = v["id"] in redeemed_ids
        return vouchers

    @staticmethod
    def get_targeted_vouchers(user_id: str) -> List[Dict[str, Any]]:
        """Task 4.1: Return 1-2 personalised vouchers based on user's assigned plant."""
        db = get_db()

        # Read assigned plant from carePlans
        plant_type = "default"
        try:
            plans = db.collection("users").document(user_id).collection("carePlans").limit(1).get()
            if plans:
                plant_type = plans[0].to_dict().get("plantType", "default") or "default"
        except Exception:
            pass

        vouchers = PLANT_VOUCHER_MAP.get(plant_type) or PLANT_VOUCHER_MAP["default"]

        # Get redeemed history
        history_doc = db.collection("users").document(user_id).collection("loyaltySummary").document("info").get()
        redeemed_ids = []
        if history_doc.exists:
            redeemed_ids = [v.get("id") for v in history_doc.to_dict().get("voucherHistory", [])]

        result = []
        for v in vouchers:
            item = {**v, "redeemed": v["id"] in redeemed_ids, "targetedFor": plant_type}
            result.append(item)
        return result

    @staticmethod
    def redeem_voucher(user_id: str, voucher_id: str) -> Dict[str, Any]:
        db = get_db()
        loyalty_ref = db.collection("users").document(user_id).collection("loyaltySummary").document("info")
        loyalty_doc = loyalty_ref.get()

        if not loyalty_doc.exists:
            return {"success": False, "message": "No loyalty record"}

        data = loyalty_doc.to_dict()
        current_points = data.get("totalPoints", 0)
        history = data.get("voucherHistory", [])

        # Guardrail #4: Strict whitelist — no Rx drugs ever
        if voucher_id not in VOUCHER_WHITELIST:
            return {"success": False, "messageKey": "voucher_invalid_rx", "message": "Voucher không hợp lệ (Guardrail #4: không áp dụng cho thuốc kê đơn)"}

        # Check cost — targeted vouchers may have custom cost
        all_items = {
            **{v["id"]: v for v in ALL_VOUCHERS},
            **{v["id"]: v for items in PLANT_VOUCHER_MAP.values() for v in items},
        }
        cost = all_items.get(voucher_id, {}).get("cost", 300)

        if current_points < cost:
            return {"success": False, "messageKey": "voucher_insufficient_points", "message": f"Không đủ điểm (cần {cost}, hiện có {current_points})", "cost": cost, "current": current_points}

        history.append({"id": voucher_id, "redeemedAt": datetime.now().isoformat()})
        loyalty_ref.update({"totalPoints": current_points - cost, "voucherHistory": history})

        # Medical audit log — immutable
        db.collection("medical_audit_log").add({
            "action": "voucher_redeemed",
            "userId": user_id,
            "voucherId": voucher_id,
            "cost": cost,
            "timestamp": datetime.now().isoformat(),
        })

        return {"success": True, "remainingPoints": current_points - cost}
