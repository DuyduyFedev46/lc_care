from fastapi import APIRouter, Depends, HTTPException
from typing import Dict, Any, List
from middleware.auth import get_current_user
from services.purchase.service import PurchaseService
from pydantic import BaseModel, Field

router = APIRouter()

class PurchaseRequest(BaseModel):
    items: List[Dict[str, Any]] = Field(min_length=1)
    totalAmount: float = Field(ge=0)
    date: str = Field(min_length=1, max_length=20)
    storeId: str = Field(min_length=1, max_length=100)

@router.get("/")
async def get_purchases(user_id: str = Depends(get_current_user)) -> List[Dict[str, Any]]:
    try:
        return PurchaseService.get_purchase_history(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
async def add_purchase(request: PurchaseRequest, user_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    try:
        return PurchaseService.add_purchase(user_id, request.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
