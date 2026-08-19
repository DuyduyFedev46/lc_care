"""Upload Service — Cloud Vision OCR (ADC) + optional Firebase Storage"""
import os
import re
import json
import base64
from datetime import datetime
from typing import Optional

from google.cloud import vision
from google.cloud.vision import Image, ImageAnnotatorClient

from config import GCLOUD_PROJECT
from .models import DocType, OCRResult, OCRMedication

_vision_client = None


def _get_vision_client() -> ImageAnnotatorClient:
    global _vision_client
    if not _vision_client:
        _vision_client = ImageAnnotatorClient()
    return _vision_client


def process_document(file_bytes: bytes, filename: str, doc_type: DocType, user_id: str) -> OCRResult:
    """Chạy Cloud Vision OCR + trích xuất structured fields."""

    # 1. Cloud Vision document_text_detection
    client = _get_vision_client()
    image = Image(content=file_bytes)
    response = client.document_text_detection(image=image)

    if response.error.message:
        raise RuntimeError(f"Cloud Vision error: {response.error.message}")

    full_text = ""
    confidence_sum = 0
    block_count = 0

    if response.full_text_annotation:
        full_text = response.full_text_annotation.text
        for page in response.full_text_annotation.pages:
            for block in page.blocks:
                if block.confidence:
                    confidence_sum += block.confidence
                    block_count += 1

    avg_confidence = round(confidence_sum / max(block_count, 1), 2)

    # 2. Parse structured fields
    medications = _extract_medications(full_text, doc_type)
    metrics = _extract_metrics(full_text, doc_type)
    patient_name = _extract_patient_name(full_text)
    doctor_name = _extract_doctor_name(full_text)
    detected_date = _extract_date(full_text)

    res = OCRResult(
        doc_type=doc_type,
        raw_text=full_text,
        confidence=avg_confidence,
        medications=medications,
        metrics=metrics,
        patient_name=patient_name,
        doctor_name=doctor_name,
        date=detected_date,
    )
    
    try:
        from services.firebase_init import get_db
        db = get_db()
        db.collection("medical_audit_log").add({
            "action": "ocr_processed",
            "userId": user_id,
            "docType": doc_type.value,
            "confidence": avg_confidence,
            "timestamp": datetime.now().isoformat()
        })
    except Exception as e:
        print(f"OCR audit log failed: {e}")
        
    return res


# ─── Structured Parsing ────────────────────────────────────────────────

def _extract_medications(text: str, doc_type: DocType) -> list:
    """Trích xuất danh sách thuốc từ text OCR — AI-first, regex fallback."""
    # 1. Try AI-based structured extraction (much more accurate)
    try:
        from ai.client import ai_client
        prompt = (
            "Trích xuất DANH SÁCH THUỐC từ văn bản OCR đơn thuốc bên dưới.\n"
            "Trả về JSON array, mỗi phần tử có các field:\n"
            '- "name": tên thuốc + hàm lượng (VD: "Augmentin 250mg")\n'
            '- "dosage": số lượng tổng cộng (VD: "21 gói", "14 viên")\n'
            '- "frequency": cách uống (VD: "3 gói/ngày chia 2 lần")\n'
            '- "instruction": ghi chú thêm nếu có (VD: "Sau ăn")\n'
            '- "doctor_name": tên bác sĩ kê đơn nếu tìm thấy\n'
            "CHỈ trả về JSON array, KHÔNG giải thích.\n\n"
            f"=== VĂN BẢN OCR ===\n{text[:2000]}"
        )
        result_text = ai_client.chat(prompt, temperature=0.1)
        # Extract JSON from response
        import json as _json
        # Try to find JSON array in response
        json_match = re.search(r'\[.*\]', result_text, re.DOTALL)
        if json_match:
            meds_data = _json.loads(json_match.group(0))
            meds = []
            for m in meds_data[:5]:
                med = OCRMedication(
                    name=str(m.get("name", ""))[:200],
                    dosage=str(m.get("dosage", ""))[:100],
                    frequency=str(m.get("frequency", ""))[:100],
                    instruction=str(m.get("instruction", ""))[:500],
                    doctor_name=m.get("doctor_name"),
                )
                if med.name:
                    meds.append(med)
            if meds:
                return meds
    except Exception as e:
        print(f"AI medication extraction failed: {e}")

    # 2. Fallback: improved regex
    meds = []
    # Match numbered items like "1/ ...", "2/ ..."
    numbered_pattern = r'\d+[/)\.]?\s*(.+?)(?=\n\d+[/)\.]|\nGhi chú|\nCông khoản|$)'
    blocks = re.findall(numbered_pattern, text, re.DOTALL | re.IGNORECASE)
    
    for block in blocks[:5]:
        lines = block.strip().split('\n')
        name_line = lines[0].strip() if lines else ""
        if not name_line or len(name_line) < 3:
            continue
        
        # Extract quantity from the block (e.g., "21 gói", "14 viên")
        qty_match = re.search(r'(\d+)\s*(gói|viên|ống|ml|capsule|tablet|lọ)', block, re.IGNORECASE)
        dosage = f"{qty_match.group(1)} {qty_match.group(2)}" if qty_match else ""
        
        # Extract frequency (e.g., "Ngày uống 3 gói chia 2 lần")
        freq_match = re.search(r'(Ngày\s+(?:uống|dùng)\s+.+?)(?:\n|$)', block, re.IGNORECASE)
        frequency = freq_match.group(1).strip() if freq_match else ""
        
        instruction = ""
        if "sau ăn" in block.lower():
            instruction = "Sau ăn"
        elif "trước ăn" in block.lower():
            instruction = "Trước ăn"
        
        meds.append(OCRMedication(
            name=name_line[:200],
            dosage=dosage,
            frequency=frequency,
            instruction=instruction,
        ))

    return meds


def _extract_metrics(text: str, doc_type: DocType) -> dict:
    """Trích xuất chỉ số y tế."""
    metrics = {}
    patterns = {
        "HbA1c": r"HbA1c[:\s]*(\d+\.?\d*\s*%?)",
        "HA_tam_thu": r"(?:HA|huyết\s*áp)[:\s]*(\d{2,3})\s*/\s*\d{2,3}",
        "HA_tam_truong": r"(?:HA|huyết\s*áp)[:\s]*\d{2,3}\s*/\s*(\d{2,3})",
        "glucose": r"(?:glucose|đường\s*huyết)[:\s]*(\d+\.?\d*)",
        "cholesterol": r"(?:cholesterol|mỡ\s*máu)[:\s]*(\d+\.?\d*)",
    }
    for key, pattern in patterns.items():
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            metrics[key] = match.group(1).strip()
    return metrics


def _extract_patient_name(text: str) -> Optional[str]:
    patterns = [
        r"(?:Họ\s*và\s*tên|Họ\s*tên|Bệnh\s*nhân|Khách\s*hàng|Patient)[:\s]+([A-ZÀ-Ỹ][a-zà-ỹ]+\s+[A-ZÀ-Ỹ][a-zà-ỹ]+(?:\s+[A-ZÀ-Ỹ][a-zà-ỹ]+)?)",
        r"([A-ZÀ-Ỹ][a-zà-ỹ]+\s+[A-ZÀ-Ỹ][a-zà-ỹ]+)\s+(?:sinh|năm|tuổi|nam|nữ)",
    ]
    for pattern in patterns:
        match = re.search(pattern, text)
        if match:
            return match.group(1).strip()
    return None


def _extract_doctor_name(text: str) -> Optional[str]:
    patterns = [
        r"(?:BS|Bác\s*sĩ|Doctor|Dr)[.:\s]*([A-ZÀ-Ỹ][a-zà-ỹ]+\s+[A-ZÀ-Ỹ][a-zà-ỹ]+(?:\s+[A-ZÀ-Ỹ][a-zà-ỹ]+)?)",
        r"([A-ZÀ-Ỹ][a-zà-ỹ]+\s+[A-ZÀ-Ỹ][a-zà-ỹ]+)\s*(?:BS|Bác\s*sĩ)",
    ]
    for pattern in patterns:
        match = re.search(pattern, text)
        if match:
            return match.group(1).strip()
    return None


def _extract_date(text: str) -> Optional[str]:
    patterns = [
        r"\d{1,2}[/-]\d{1,2}[/-]\d{4}",
        r"\d{1,2}\s+(?:tháng|t)\s+\d{1,2}\s*,?\s*\d{4}",
    ]
    for pattern in patterns:
        match = re.search(pattern, text)
        if match:
            return match.group(0)
    return None
