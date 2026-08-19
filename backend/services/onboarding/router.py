"""Onboarding API Routes"""
from fastapi import APIRouter, HTTPException, Depends
from typing import Dict, Any
from pydantic import BaseModel, Field, field_validator
from services.onboarding.service import OnboardingService
from middleware.auth import get_current_user

router = APIRouter()

REQUIRED_PROFILE_KEYS = {"fullName", "gender", "yearOfBirth", "careFor", "healthStatus"}

class OnboardingSubmitRequest(BaseModel):
    userProfile: Dict[str, Any]
    assignedPlants: Dict[str, Any] = Field(default_factory=dict)
    familyMembers: list = Field(default_factory=list)
    ocrResults: Dict[str, Any] = Field(default_factory=dict)
    lang: str = Field(default="vi", max_length=5)

    @field_validator("userProfile")
    @classmethod
    def validate_user_profile(cls, v):
        missing = REQUIRED_PROFILE_KEYS - set(v.keys())
        if missing:
            raise ValueError(f"Thiếu trường bắt buộc trong userProfile: {', '.join(missing)}")
        return v

@router.post("/submit")
def submit_onboarding(request: OnboardingSubmitRequest, user_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    """Submit complete onboarding profile. Assigns plant, creates care plan."""
    try:
        return OnboardingService.submit(user_id, request.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/status/{user_id}")
def get_onboarding_status(user_id: str) -> Dict[str, Any]:
    """Get onboarding/approval status for a user."""
    try:
        return OnboardingService.get_status(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
