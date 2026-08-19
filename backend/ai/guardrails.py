"""AI Guardrails — Banned patterns + content filter (Rule #0 compliant)"""
import re
from datetime import datetime

# ═══ LỚP 1: TỪ CẤM (BANNED PATTERNS) ═══
BANNED_PATTERNS = [
    # Suy ra bệnh từ thuốc / chẩn đoán trực tiếp
    r"(bạn|chị|anh|cô|chú|bác|ông|bà|KH)\s+(đang\s+)?(bị|mắc)\s+(bệnh\s+)?\w+",
    r"(chẩn đoán|diagnosis)\s+(là|with|:)",
    r"bạn\s+có\s+(bệnh|bị)\s+\w+",
    r"bạn\s+có\s+dấu\s+hiệu\s+\w+",

    # Kê đơn / đề xuất thuốc
    r"bạn\s+nên\s+dùng\s+(thêm\s+)?(thuốc|liều)\s+\w+",
    r"tôi\s+(kê|đề\s+xuất)\s+(thêm\s+)?(thuốc|liều)",
    r"(nên|cần)\s+(bổ\s+sung|thêm|dùng\s+thêm)\s+(thuốc|liều)\s+\w+",

    # Từ cấm tuyệt đối
    r"bệnh\s+nhân",
    r"phác\s+đồ\s+điều\s+trị",

    # Đề xuất cây thảo dược (AI không được đề xuất)
    r"(nên|phù\s+hợp|gợi\s+ý)\s+(trồng|chăm\s+sóc)?\s*cây\s+(gừng|nghệ|sả|tỏi|bạc\s+hà|húng|diếp)",

    # Suy luận di truyền
    r"(di\s+truyền|gen|gene)\s+.*(nguy\s+cơ|khả\s+năng|có\s+thể\s+mắc)",
    r"(bố|mẹ|cha|mẹ)\s+.*(bị|mắc)\s+.*con\s+.*(nguy\s+cơ|có\s+thể)",
]

# Banned patterns for Japanese output (Rule #0 — no diagnosis)
BANNED_PATTERNS_JA = [
    r"(あなた|お客様|患者)\s*(は|が)\s*(病気|疾患)\s*(です|と推定)",
    r"診断\s*(は|:)",
    r"患者",
    r"治療\s*方針",
]

# ═══ LỚP 2: DISCLAIMER BẮT BUỘC ═══
REQUIRED_DISCLAIMERS = [
    r"(dược\s+sĩ|DS|bác\s+sĩ|chuyên\s+viên\s+y\s+tế)\s+.*(sẽ|sẽ\s+là|quyết\s+định|xem\s+xét|tư\s+vấn|xác\s+nhận)",
]

# Japanese: matches "薬剤師が確認し、最終判断を行います" and similar
REQUIRED_DISCLAIMERS_JA = [
    r"薬剤師.*(確認|判断|ご確認)",
]

# ═══ TỪ CẤM ĐỨNG MỘT MÌNH ═══
BANNED_EXACT_PHRASES = [
    "điều trị bệnh",
    "mắc bệnh",
    "bị bệnh",
    "kết luận bệnh",
]


def validate_ai_response(text: str, lang: str = "vi") -> tuple:
    """
    Validates AI output against Rule #0 guardrails.
    Lang-aware: uses Japanese disclaimer/banned sets for lang='ja'.
    Returns (is_safe: bool, violations: list[str])
    """
    violations = []

    if lang == "ja":
        # Japanese: check JA-specific banned patterns only (VN patterns would false-positive)
        for pattern in BANNED_PATTERNS_JA:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                violations.append(f"BANNED_PATTERN_JA: '{match.group()}' matched '{pattern}'")

        # Check required disclaimer (Japanese)
        has_disclaimer = any(re.search(p, text) for p in REQUIRED_DISCLAIMERS_JA)
        if not has_disclaimer:
            violations.append("MISSING_DISCLAIMER_JA: output lacks 薬剤師確認 disclaimer")
    else:
        # Vietnamese (default): original logic
        for pattern in BANNED_PATTERNS:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                violations.append(f"BANNED_PATTERN: '{match.group()}' matched '{pattern}'")

        text_lower = text.lower()
        for phrase in BANNED_EXACT_PHRASES:
            if phrase in text_lower:
                violations.append(f"BANNED_PHRASE: '{phrase}'")

        has_disclaimer = any(re.search(p, text, re.IGNORECASE) for p in REQUIRED_DISCLAIMERS)
        if not has_disclaimer:
            violations.append("MISSING_DISCLAIMER: output thiếu nhắc DS/BS xem xét")

    return len(violations) == 0, violations

def log_ai_output(user_id: str, prompt_template: str, output_text: str, is_safe: bool, violations: list):
    """Ghi log AI output vào medical_audit_log (Layer 3 Guardrail)"""
    try:
        from services.firebase_init import get_db
        db = get_db()
        db.collection("medical_audit_log").add({
            "action": "ai_generation",
            "userId": user_id or "unknown",
            "promptTemplate": prompt_template,
            "outputText": output_text,
            "isSafe": is_safe,
            "violations": violations,
            "timestamp": datetime.now().isoformat()
        })
    except Exception as e:
        print(f"Failed to log AI output: {e}")
