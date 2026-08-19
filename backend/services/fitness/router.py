"""Google Fit integration routes"""
from fastapi import APIRouter, HTTPException, Depends, Query
from fastapi.responses import RedirectResponse
from middleware.auth import get_current_user
from services.fitness.service import FitnessService
from config import GOOGLE_FIT_FRONTEND_REDIRECT

router = APIRouter()


@router.get("/auth-url")
async def get_auth_url(user_id: str = Depends(get_current_user)):
    """
    Trả về Google OAuth URL.
    Frontend redirect user tới URL này để bắt đầu flow kết nối.
    """
    url = FitnessService.get_auth_url(state=user_id)
    return {"auth_url": url}


@router.get("/callback")
async def oauth_callback(
    code: str = Query(...),
    state: str = Query(...),   # state = user_id được truyền lúc tạo auth_url
    error: str = Query(None),
):
    """
    Google redirect về đây sau khi user approve.
    Đổi code lấy tokens, lưu Firestore, redirect về frontend.
    """
    if error:
        # User từ chối hoặc có lỗi → redirect về frontend với status=error
        return RedirectResponse(
            url=f"{GOOGLE_FIT_FRONTEND_REDIRECT}?fitness_status=error&reason={error}"
        )

    try:
        token_data = await FitnessService.exchange_code(code)
        FitnessService.save_tokens(user_id=state, token_data=token_data)

        # Sync ngay lần đầu sau khi kết nối
        await FitnessService.fetch_fitness_data(user_id=state)

        return RedirectResponse(
            url=f"{GOOGLE_FIT_FRONTEND_REDIRECT}?fitness_status=connected"
        )
    except Exception as e:
        print(f"[FitnessCallback] Error: {e}")
        return RedirectResponse(
            url=f"{GOOGLE_FIT_FRONTEND_REDIRECT}?fitness_status=error&reason=token_exchange_failed"
        )


@router.get("/status")
async def get_status(user_id: str = Depends(get_current_user)):
    """Kiểm tra user đã kết nối Google Fit chưa và lần sync cuối"""
    tokens = FitnessService.get_tokens(user_id)
    if not tokens or not tokens.get("connected"):
        return {"connected": False, "last_synced_at": None}
    return {
        "connected": True,
        "last_synced_at": tokens.get("last_synced_at"),
        "connected_at": tokens.get("connected_at"),
    }


@router.post("/sync")
async def sync_data(user_id: str = Depends(get_current_user)):
    """
    Đồng bộ dữ liệu sức khoẻ từ Google Fit.
    Dùng refresh_token đã lưu — user không cần làm gì thêm.
    """
    tokens = FitnessService.get_tokens(user_id)
    if not tokens or not tokens.get("connected"):
        raise HTTPException(status_code=400, detail="Chưa kết nối Google Fit")

    try:
        data = await FitnessService.fetch_fitness_data(user_id)
        if "error" in data:
            raise HTTPException(status_code=401, detail="Token hết hạn hoặc bị thu hồi. Vui lòng kết nối lại.")
        return {"success": True, "data": data}
    except HTTPException:
        raise
    except Exception as e:
        print(f"[FitnessSync] Error for {user_id}: {e}")
        raise HTTPException(status_code=500, detail="Không thể đồng bộ dữ liệu")


@router.get("/data")
async def get_health_data(user_id: str = Depends(get_current_user)):
    """Lấy health_metrics đã sync gần nhất từ Firestore (không gọi Google API)"""
    from services.firebase_init import get_db
    from datetime import datetime, timezone, timedelta

    db = get_db()
    # Lấy 7 ngày gần nhất
    docs = db.collection("users").document(user_id)\
             .collection("health_metrics")\
             .order_by("date", direction="DESCENDING")\
             .limit(7)\
             .stream()

    metrics = [doc.to_dict() for doc in docs]
    return {"metrics": metrics}


@router.delete("/disconnect")
async def disconnect(user_id: str = Depends(get_current_user)):
    """Ngắt kết nối Google Fit — xóa tokens khỏi Firestore"""
    FitnessService.disconnect(user_id)
    return {"success": True, "message": "Đã ngắt kết nối Google Fit"}
