"""AI API Routes"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Optional, List
from ai.prompt_manager import prompt_manager
from ai.guardrails import validate_ai_response, log_ai_output
from ai.client import ai_client
from services.upload.models import DocType
from services.upload.service import process_document
import base64

router = APIRouter()


class PurchaseSummaryReq(BaseModel):
    store: str = Field(min_length=1, max_length=200)
    purchases: List[dict] = Field(min_length=1)
    lang: str = Field(default="vi", max_length=5)


class OCRExtractReq(BaseModel):
    docType: DocType
    image: str = Field(min_length=10)
    lang: str = Field(default="vi", max_length=5)


class AdminSummaryReq(BaseModel):
    customerName: str = Field(min_length=1, max_length=100)
    customerAge: int = Field(ge=0, le=150)
    purchases: List[dict] = Field(min_length=1)
    ocrResults: Optional[dict] = None
    documents: List[str] = Field(default_factory=list)
    lang: str = Field(default="vi", max_length=5)


class OCRSummaryReq(BaseModel):
    doc_type: DocType
    doc_type_label: str = Field(min_length=1, max_length=50)
    raw_text: str = Field(min_length=1)
    medications: List[dict] = Field(default_factory=list)
    metrics: dict = Field(default_factory=dict)
    lang: str = Field(default="vi", max_length=5)


class CrossMemberReq(BaseModel):
    members: List[dict] = Field(min_length=1, max_length=20)
    lang: str = Field(default="vi", max_length=5)


class HabitSuggestionReq(BaseModel):
    customerName: str = Field(default="KH", max_length=100)
    customerAge: str = Field(default="Chưa rõ", max_length=10)
    currentProducts: List[str] = Field(default_factory=list)
    activePlant: str = Field(default="Chưa có", max_length=100)
    streakDays: int = Field(default=0, ge=0, le=3650)
    lang: str = Field(default="vi", max_length=5)


@router.post("/purchase-summary")
async def purchase_summary(req: PurchaseSummaryReq):
    try:
        prompt = prompt_manager.render("purchase_summary", {
            "store_name": req.store,
            "purchase_list": req.purchases,
        }, lang=req.lang)
        text = ai_client.chat(prompt, lang=req.lang)
        is_safe, violations = validate_ai_response(text, lang=req.lang)
        log_ai_output("unknown", "purchase_summary", text, is_safe, violations)
        return {"text": text, "safe": is_safe, "violations": violations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/ocr-extract")
async def ocr_extract(req: OCRExtractReq):
    """OCR via Google Cloud Vision"""
    try:
        if "," in req.image:
            img_data = req.image.split(",")[1]
        else:
            img_data = req.image
        file_bytes = base64.b64decode(img_data)
        
        result = process_document(
            file_bytes=file_bytes,
            filename="image.jpg",
            doc_type=req.docType,
            user_id="ai_extracted"
        )
        
        # Log OCR via AI router
        try:
            from services.firebase_init import get_db
            from datetime import datetime
            db = get_db()
            db.collection("medical_audit_log").add({
                "action": "ocr_processed",
                "userId": "ai_extracted",
                "docType": req.docType.value,
                "confidence": result.confidence,
                "timestamp": datetime.now().isoformat()
            })
        except Exception:
            pass

        return {
            "text": result.raw_text, 
            "safe": True, 
            "violations": [],
            "medications": [m.dict() for m in result.medications],
            "metrics": result.metrics
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/admin-summary")
async def admin_summary(req: AdminSummaryReq):
    try:
        prompt = prompt_manager.render("admin_summary", {
            "customer_name": req.customerName,
            "customer_age": req.customerAge,
            "customer_gender": "Chưa rõ",
            "purchases": req.purchases,
            "ocr_results": req.ocrResults or "Chưa có",
            "documents": req.documents or [],
        }, lang=req.lang)
        text = ai_client.chat(prompt, lang=req.lang)
        is_safe, violations = validate_ai_response(text, lang=req.lang)
        log_ai_output("unknown", "admin_summary", text, is_safe, violations)
        return {"text": text, "safe": is_safe, "violations": violations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/cross-member-insight")
async def cross_member_insight(req: CrossMemberReq):
    try:
        prompt = prompt_manager.render("insight_cross_member", {
            "members": req.members,
        }, lang=req.lang)
        text = ai_client.chat(prompt, lang=req.lang)
        is_safe, violations = validate_ai_response(text, lang=req.lang)
        log_ai_output("unknown", "insight_cross_member", text, is_safe, violations)
        return {"text": text, "safe": is_safe, "violations": violations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/habit-suggestion")
async def habit_suggestion(req: HabitSuggestionReq):
    try:
        prompt = prompt_manager.render("habit_suggestion", {
            "customer_name": req.customerName,
            "customer_age": req.customerAge,
            "current_products": req.currentProducts,
            "active_plant": req.activePlant,
            "streak_days": req.streakDays,
        }, lang=req.lang)
        text = ai_client.chat(prompt, lang=req.lang)
        is_safe, violations = validate_ai_response(text, lang=req.lang)
        log_ai_output("unknown", "habit_suggestion", text, is_safe, violations)
        return {"text": text, "safe": is_safe, "violations": violations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/ocr-summary")
async def ocr_summary(req: OCRSummaryReq):
    """AI summary of OCR result for user display"""
    try:
        prompt = prompt_manager.render("ocr_summary", {
            "doc_type_label": req.doc_type_label,
            "raw_text": req.raw_text[:1500],
            "medications": req.medications,
            "metrics": req.metrics,
        }, lang=req.lang)
        text = ai_client.chat(prompt, lang=req.lang)
        is_safe, violations = validate_ai_response(text, lang=req.lang)
        log_ai_output("unknown", "ocr_summary", text, is_safe, violations)
        return {"text": text, "safe": is_safe, "violations": violations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
