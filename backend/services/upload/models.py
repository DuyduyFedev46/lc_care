"""Upload & OCR data models"""
from pydantic import BaseModel, Field
from typing import Optional, List
from enum import Enum


class DocType(str, Enum):
    PRESCRIPTION = "prescription"      # Đơn thuốc
    LAB_RESULT = "lab_result"          # Xét nghiệm
    MEDICAL_BOOK = "medical_book"      # Sổ khám bệnh
    ULTRASOUND = "ultrasound"          # Siêu âm
    VACCINATION = "vaccination"        # Sổ tiêm chủng


class OCRMedication(BaseModel):
    name: str = Field(default="", max_length=200)
    dosage: str = Field(default="", max_length=100)
    frequency: str = Field(default="", max_length=100)
    instruction: str = Field(default="", max_length=500)
    doctor_name: Optional[str] = Field(default=None, max_length=100)


class OCRResult(BaseModel):
    doc_type: DocType
    raw_text: str = ""
    confidence: float = Field(default=0.0, ge=0.0, le=1.0)
    medications: List[OCRMedication] = []
    metrics: dict = {}
    patient_name: Optional[str] = Field(default=None, max_length=100)
    doctor_name: Optional[str] = Field(default=None, max_length=100)
    date: Optional[str] = Field(default=None, max_length=20)
    hospital_name: Optional[str] = Field(default=None, max_length=200)
