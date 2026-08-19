"""Habit catalog — reads from Firestore `habitCatalog` collection.

Falls back to hardcoded FALLBACK_CATALOG if Firestore is empty.
Uses in-memory cache with 5-minute TTL.
"""
import time
from typing import Dict, List, Any

# ── In-memory cache ──────────────────────────────────────────────────────
_cache: Dict[str, Any] = {}
_cache_ts: float = 0
CACHE_TTL = 300  # 5 minutes


def _load_catalog() -> Dict[str, Any]:
    """Load habit catalog from Firestore with caching."""
    global _cache, _cache_ts
    if time.time() - _cache_ts < CACHE_TTL and _cache:
        return _cache

    try:
        from services.firebase_init import get_db
        db = get_db()
        docs = db.collection("habitCatalog").stream()
        result = {}
        for doc in docs:
            data = doc.to_dict()
            result[doc.id] = data
        if result:
            _cache = result
            _cache_ts = time.time()
            return _cache
    except Exception as e:
        print(f"[habit_catalog] Firestore read failed, using fallback: {e}")

    # Fallback to hardcoded if Firestore empty or failed
    if not _cache:
        _cache = _build_fallback()
        _cache_ts = time.time()
    return _cache


def _build_fallback() -> Dict[str, Any]:
    """Build catalog from hardcoded data (backward compat)."""
    result = {}
    for group_id, entry in FALLBACK_CATALOG.items():
        default_habits = [{"active": True, "done": False, **h} for h in entry["default"]]
        optional_habits = [{"active": False, "done": False, **h} for h in entry["optional"]]
        result[group_id] = {
            "groupId": group_id,
            "label": entry["label"],
            "habits": default_habits + optional_habits,
        }
    return result


def get_all_habits(group_id: str, lang: str = "vi") -> list:
    """Return all habits (default active + optional inactive) for a plant group."""
    catalog = _load_catalog()
    entry = catalog.get(group_id, catalog.get("G1", {}))
    habits = entry.get("habits", [])
    result = [{"active": h.get("active", False), "done": False, **{k: v for k, v in h.items() if k not in ("active", "done", "doneAt")}} for h in habits]
    # Override name with localized version if present
    if lang == "ja":
        for h in result:
            if h.get("name_ja"):
                h["name"] = h["name_ja"]
    return result


def get_default_habits(group_id: str, lang: str = "vi") -> list:
    """Return only active (default) habits."""
    return [h for h in get_all_habits(group_id, lang=lang) if h.get("active")]


def get_optional_habits(group_id: str, lang: str = "vi") -> list:
    """Return only optional (inactive) habits."""
    return [h for h in get_all_habits(group_id, lang=lang) if not h.get("active")]


def get_catalog_label(group_id: str, lang: str = "vi") -> str:
    """Return the journey label for a plant group (lang-aware)."""
    catalog = _load_catalog()
    entry = catalog.get(group_id, catalog.get("G1", {}))
    if lang == "ja":
        return entry.get("label_ja", entry.get("label", "健康管理"))
    return entry.get("label", "Chăm sóc sức khỏe")


# For backward compat: HABIT_CATALOG property that loads from Firestore
class _CatalogProxy:
    """Dict-like proxy that loads from Firestore on access."""
    def get(self, key, default=None):
        catalog = _load_catalog()
        return catalog.get(key, default)

    def __getitem__(self, key):
        catalog = _load_catalog()
        return catalog[key]

    def __contains__(self, key):
        return key in _load_catalog()

    def items(self):
        return _load_catalog().items()

    def keys(self):
        return _load_catalog().keys()

    def values(self):
        return _load_catalog().values()


HABIT_CATALOG = _CatalogProxy()


# ── Hardcoded fallback (only used if Firestore is empty) ──────────────────
FALLBACK_CATALOG = {
    "G1": {
        "label": "Sức khỏe nền tảng",
        "label_ja": "基礎健康",
        "default": [
            {"id": "water_2l",   "name": "Uống đủ 2L nước",       "name_ja": "2Lの水を飲む",         "time": "Cả ngày", "icon": "ui_water_drop",       "points": 10},
            {"id": "walk_30",    "name": "Đi bộ 30 phút",          "name_ja": "30分散歩",              "time": "17:00",   "icon": "ui_heart_health",     "points": 15},
            {"id": "sleep_7h",   "name": "Ngủ đủ 7-8 tiếng",       "name_ja": "7～8時間の睡眠",         "time": "22:30",   "icon": "ui_lightbulb_insight","points": 10},
        ],
        "optional": [
            {"id": "stretch_am", "name": "Giãn cơ buổi sáng 5 phút","name_ja": "朝のストレッチ5分",   "time": "07:30",  "icon": "ui_heart_health",     "points": 5},
            {"id": "no_phone",   "name": "Không dùng điện thoại trước ngủ","name_ja": "就寝前はスマホを見ない","time": "21:30","icon": "ui_lightbulb_insight","points": 10},
        ],
    },
    "G2": {
        "label": "Theo dõi sức khỏe",
        "label_ja": "健康モニタリング",
        "default": [
            {"id": "bp_log",     "name": "Ghi chỉ số huyết áp",    "name_ja": "血圧を記録",           "time": "08:00",   "icon": "ui_chart_bar",        "points": 15},
            {"id": "meds_am",    "name": "Uống thuốc buổi sáng",    "name_ja": "朝の薬を飲む",            "time": "07:30",   "icon": "ui_pill_medicine",    "points": 20},
            {"id": "water_2l",   "name": "Uống đủ 2L nước",         "name_ja": "2Lの水を飲む",           "time": "Cả ngày", "icon": "ui_water_drop",       "points": 10},
        ],
        "optional": [
            {"id": "low_salt",   "name": "Ăn nhạt hôm nay",         "name_ja": "今日は塩分を減らす",       "time": "Bữa ăn", "icon": "ui_note_pencil",      "points": 10},
            {"id": "walk_20",    "name": "Đi bộ nhẹ 20 phút",       "name_ja": "軽い散歩20分",           "time": "17:00",   "icon": "ui_heart_health",     "points": 10},
        ],
    },
}
