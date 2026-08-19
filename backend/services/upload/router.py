"""Upload API Routes — OCR giấy tờ y tế"""
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from .models import DocType, OCRResult
from .service import process_document

router = APIRouter()


@router.post("/document", response_model=OCRResult)
async def upload_document(
    file: UploadFile = File(...),
    doc_type: str = Form("prescription"),
    user_id: str = Form("demo-user-1"),
):
    """Upload giấy tờ y tế + chạy OCR qua Cloud Vision."""
    # Validate file
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(400, "Chỉ chấp nhận file ảnh (JPEG, PNG)")

    # Validate doc_type
    try:
        dt = DocType(doc_type)
    except ValueError:
        raise HTTPException(400, f"Loại giấy tờ không hợp lệ: {doc_type}. Chấp nhận: {[d.value for d in DocType]}")

    # Read file (max 10MB)
    file_bytes = await file.read()
    if len(file_bytes) > 10 * 1024 * 1024:
        raise HTTPException(400, "File quá lớn (tối đa 10MB)")

    try:
        result = process_document(
            file_bytes=file_bytes,
            filename=file.filename or "document.jpg",
            doc_type=dt,
            user_id=user_id,
        )
        return result
    except Exception as e:
        raise HTTPException(500, f"Lỗi xử lý OCR: {str(e)}")


@router.get("/results/{user_id}")
async def get_ocr_results(user_id: str):
    """Lấy danh sách kết quả OCR của user."""
    from .service import _get_db
    docs = (
        _get_db()
        .collection("ocr_results")
        .where("user_id", "==", user_id)
        .order_by("created_at", direction="DESCENDING")
        .limit(20)
        .stream()
    )
    return [doc.to_dict() for doc in docs]
