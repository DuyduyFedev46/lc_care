"""Shared validation constants for LC_Care backend."""

# ── Enum value sets ──
GENDERS = {"male", "female"}
CARE_FOR = {"self", "child", "parents", "family"}
HEALTH_STATUS = {"healthy", "monitoring", "chronic", "mental", "pregnant", "recovery"}
CHRONIC_SUB_CONDITIONS = {"diabetes", "hypertension", "cholesterol", "bone_joint", "digestive"}
EXERCISE = {"active", "sometimes", "sedentary", "starting"}
BAD_HABITS = {"latenight", "alcohol", "unhealthy_eating", "stress", "smoking", "skip_meals", "sleep_late", "ok"}
LIFE_CHANGES = {"job", "move", "pregnant", "baby", "retired", "travel", "none"}
PLANT_STATUS = {"pending", "growing", "paused", "graduated"}
JOURNEY_TYPES = {
    "health_care", "monitoring", "prevention", "screening", "maternity",
    "pediatric", "long_term_adherence", "mental_wellness", "recovery",
    "digestive_health", "bone_health",
}
RELATIONS = {"self", "spouse", "child", "parent", "sibling", "grandparent", "other"}

# ── Field length/int limits ──
NAME_MAX_LENGTH = 100
NOTE_MAX_LENGTH = 2000
YEAR_MIN = 1900
YEAR_MAX = 2016
AGE_MIN = 0
AGE_MAX = 150
CYCLE_LENGTH_MIN = 18
CYCLE_LENGTH_MAX = 45
PLANT_LEVEL_MIN = 1
PLANT_LEVEL_MAX = 10
STREAK_DAYS_MAX = 3650
HABIT_ID_MIN = 0
CONFIDENCE_MIN = 0.0
CONFIDENCE_MAX = 1.0

# ── Collection limits ──
PURCHASE_ITEMS_MIN = 1
FAMILY_MEMBERS_MIN = 1
FAMILY_MEMBERS_MAX = 6
CROSS_MEMBER_MAX = 20

# ── Vietnamese error messages ──
ERRORS = {
    "required": "Vui lòng nhập {field}",
    "invalid_enum": "{field} không hợp lệ. Các giá trị chấp nhận: {values}",
    "min_length": "{field} phải có ít nhất {min} ký tự",
    "max_length": "{field} không được vượt quá {max} ký tự",
    "year_range": "Năm sinh phải từ {min} đến {max}",
    "age_range": "Tuổi phải từ {min} đến {max}",
    "ge": "{field} phải lớn hơn hoặc bằng {min}",
    "le": "{field} phải nhỏ hơn hoặc bằng {max}",
    "min_items": "Phải có ít nhất {min} mục",
    "max_items": "Không được vượt quá {max} mục",
}
