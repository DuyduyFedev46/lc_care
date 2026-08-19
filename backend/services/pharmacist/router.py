from fastapi import APIRouter, Depends, HTTPException
from typing import Dict, Any, List
from middleware.auth import get_current_user
from services.pharmacist.service import PharmacistService
from pydantic import BaseModel, Field

router = APIRouter()

class ApproveRequest(BaseModel):
    note: str = Field(default="", max_length=2000)
    createCarePlan: bool = True
    journeyType: str = Field(default="general", max_length=50)
    plantType: str = Field(default="", max_length=50)

@router.get("/queue")
async def get_queue(pharmacist_id: str = Depends(get_current_user)) -> List[Dict[str, Any]]:
    # In a real app, verify pharmacist_id has pharmacist role
    try:
        return PharmacistService.get_queue()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/customer/{user_id}")
async def get_customer(user_id: str, pharmacist_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    try:
        return PharmacistService.get_customer_details(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class RejectRequest(BaseModel):
    reason: str = Field(default="", max_length=2000)

@router.post("/approve/{draft_id}")
async def approve_draft(draft_id: str, request: ApproveRequest, pharmacist_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    try:
        return PharmacistService.approve_draft(draft_id, request.dict(), pharmacist_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/reject/{draft_id}")
async def reject_draft(draft_id: str, request: RejectRequest, pharmacist_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    try:
        return PharmacistService.reject_draft(draft_id, request.dict(), pharmacist_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
