from fastapi import APIRouter, Depends, HTTPException
from typing import Dict, Any, List
from middleware.auth import get_current_user
from services.notification.service import NotificationService
from pydantic import BaseModel

router = APIRouter()

class FCMTokenReq(BaseModel):
    token: str

@router.get("/")
async def get_notifications(user_id: str = Depends(get_current_user)) -> List[Dict[str, Any]]:
    try:
        return NotificationService.get_notifications(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/read/{notification_id}")
async def mark_as_read(notification_id: str, user_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    try:
        return NotificationService.mark_as_read(user_id, notification_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/register-device")
async def register_device(req: FCMTokenReq, user_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    """Register FCM token for push notifications."""
    try:
        return NotificationService.register_device(user_id, req.token)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/register-token")
async def register_token(req: FCMTokenReq, user_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    """Alias for /register-device — used by frontend firebase.js client."""
    try:
        return NotificationService.register_device(user_id, req.token)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
