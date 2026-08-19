from fastapi import APIRouter, Depends, HTTPException
from typing import Dict, Any, List
from middleware.auth import get_current_user
from services.voucher.service import VoucherService
from pydantic import BaseModel

router = APIRouter()

@router.get("/")
async def get_vouchers(user_id: str = Depends(get_current_user)) -> List[Dict[str, Any]]:
    try:
        return VoucherService.get_vouchers(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/targeted")
async def get_targeted_vouchers(user_id: str = Depends(get_current_user)) -> List[Dict[str, Any]]:
    """Task 4.1: Return personalised vouchers based on user's assigned plant."""
    try:
        return VoucherService.get_targeted_vouchers(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/redeem/{voucher_id}")
async def redeem_voucher(voucher_id: str, user_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    try:
        return VoucherService.redeem_voucher(user_id, voucher_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
