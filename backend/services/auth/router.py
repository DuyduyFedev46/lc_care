"""auth API routes"""
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from services.auth.service import AuthService

from middleware.auth import get_current_user
from services.firebase_init import get_db

router = APIRouter()

class LoginRequest(BaseModel):
    phone: str
    fullName: str = ""

class ProfilePatchRequest(BaseModel):
    fullName: str = None
    gender: str = None
    yearOfBirth: str = None
    cycleData: dict = None

@router.get("/")
def list_auth():
    return {"service": "auth", "items": []}

@router.get("/me")
def get_me(user_id: str = Depends(get_current_user)):
    db = get_db()
    user_doc = db.collection("users").document(user_id).get()
    if not user_doc.exists:
        raise HTTPException(status_code=404, detail="Không tìm thấy thông tin người dùng")
    return user_doc.to_dict()

@router.patch("/profile")
def update_profile(request: ProfilePatchRequest, user_id: str = Depends(get_current_user)):
    db = get_db()
    user_ref = db.collection("users").document(user_id)
    user_doc = user_ref.get()
    if not user_doc.exists:
        raise HTTPException(status_code=404, detail="Không tìm thấy thông tin người dùng")
    
    update_data = {}
    if request.fullName is not None:
        update_data["fullName"] = request.fullName
    if request.gender is not None:
        update_data["gender"] = request.gender
    if request.yearOfBirth is not None:
        update_data["yearOfBirth"] = request.yearOfBirth
    if request.cycleData is not None:
        update_data["cycleData"] = request.cycleData

    if update_data:
        from datetime import datetime
        update_data["updatedAt"] = datetime.utcnow().isoformat()
        user_ref.update(update_data)
        
    return user_ref.get().to_dict()

@router.post("/login")
def login(request: LoginRequest):

    try:
        result = AuthService.login(request.phone, request.fullName)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi đăng nhập: {str(e)}")

