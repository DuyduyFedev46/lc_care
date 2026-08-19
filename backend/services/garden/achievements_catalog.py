"""
Single source of truth for achievements and quests.
IDs match frontend/src/config/achievements.js exactly.
"""

ACHIEVEMENTS_CATALOG = [
    {
        "id": "first_water",
        "title": "Mầm Xanh Đầu Tiên 🌱",
        "desc": "Hoàn thành thói quen lần đầu tiên",
        "icon": "🌱",
        "gradient": ["#22C55E", "#16A34A"],
        "target_field": "streak",
        "target_value": 1,
    },
    {
        "id": "streak_7",
        "title": "Tuần Lễ Vàng 🔥",
        "desc": "7 ngày liên tiếp hoàn thành thói quen",
        "icon": "🔥",
        "gradient": ["#F59E0B", "#D97706"],
        "target_field": "streak",
        "target_value": 7,
    },
    {
        "id": "streak_30",
        "title": "Tháng Thói Quen 🏆",
        "desc": "30 ngày kiên trì — cây bắt đầu ra hoa!",
        "icon": "🏆",
        "gradient": ["#8B5CF6", "#7C3AED"],
        "target_field": "streak",
        "target_value": 30,
    },
    {
        "id": "level_up",
        "title": "Cây Lớn Mạnh 🌿",
        "desc": "Cây đã lên level 2",
        "icon": "🌿",
        "gradient": ["#10B981", "#059669"],
        "target_field": "plant_level",
        "target_value": 2,
    },
    {
        "id": "family_joined",
        "title": "Vườn Nhà Đầy Đủ 🏡",
        "desc": "Có ít nhất 1 thành viên gia đình tham gia",
        "icon": "🏡",
        "gradient": ["#3B82F6", "#2563EB"],
        "target_field": "family_count",
        "target_value": 1,
    },
    {
        "id": "water_for_family",
        "title": "Người Thân Chu Đáo 💧",
        "desc": "Đã tưới hộ cây cho người thân",
        "icon": "💧",
        "gradient": ["#06B6D4", "#0891B2"],
        "target_field": "watered_for_others",
        "target_value": 1,
    },
    {
        "id": "voucher_redeemed",
        "title": "Thu Hoạch Đầu Mùa 🎁",
        "desc": "Đổi voucher chăm sóc sức khỏe lần đầu",
        "icon": "🎁",
        "gradient": ["#EC4899", "#DB2777"],
        "target_field": "vouchers_redeemed",
        "target_value": 1,
    },
    {
        "id": "points_100",
        "title": "Tích Lũy 100 Điểm ⭐",
        "desc": "Có tổng cộng 100 điểm sức khỏe",
        "icon": "⭐",
        "gradient": ["#EAB308", "#CA8A04"],
        "target_field": "points",
        "target_value": 100,
    },
]

QUESTS_CATALOG = [
    {
        "id": "daily_water",
        "type": "daily",
        "title": "Tưới cây hôm nay",
        "icon": "💧",
        "target_field": "today_watered",
        "target_value": 1,
        "reward": 10,
    },
    {
        "id": "daily_all_habits",
        "type": "daily",
        "title": "Hoàn thành mọi nhiệm vụ hôm nay",
        "icon": "✅",
        "target_field": "habits_completed_today",
        "target_value": None,  # dynamic: equals total active habits
        "reward": 20,
    },
    {
        "id": "weekly_streak_3",
        "type": "weekly",
        "title": "Tưới cây 3 ngày trong tuần này",
        "icon": "🔥",
        "target_field": "week_days_active",
        "target_value": 3,
        "reward": 30,
    },
    {
        "id": "weekly_family",
        "type": "weekly",
        "title": "Tưới hộ 1 người thân tuần này",
        "icon": "🏡",
        "target_field": "watered_for_others_week",
        "target_value": 1,
        "reward": 50,
    },
]
