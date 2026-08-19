from fastapi import APIRouter, Depends, HTTPException
from typing import Dict, Any, List, Optional
from middleware.auth import get_current_user
from services.careplan.service import CarePlanService
from pydantic import BaseModel, Field

router = APIRouter()

class CarePlanRequest(BaseModel):
    journeyType: str = Field(min_length=1, max_length=50)
    plantType: str = Field(min_length=1, max_length=50)
    plantLevel: int = Field(ge=1, le=10)
    plantStatus: str = Field(min_length=1, max_length=20)


class CarePlanUpdateRequest(BaseModel):
    plantLevel: Optional[int] = Field(default=None, ge=1, le=10)
    plantStatus: Optional[str] = Field(default=None, max_length=20)
    journeyType: Optional[str] = Field(default=None, max_length=50)
    plantType: Optional[str] = Field(default=None, max_length=50)

@router.get("/")
async def get_care_plans(user_id: str = Depends(get_current_user)) -> List[Dict[str, Any]]:
    try:
        return CarePlanService.get_care_plans(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
async def create_care_plan(request: CarePlanRequest, user_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    try:
        return CarePlanService.create_care_plan(user_id, request.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        
@router.put("/{plan_id}")
async def update_care_plan(plan_id: str, request: CarePlanUpdateRequest, user_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    try:
        return CarePlanService.update_care_plan(user_id, plan_id, request.dict(exclude_none=True))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class HabitPatch(BaseModel):
    active: Optional[bool] = None
    done: Optional[bool] = None


class CustomHabitRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    time: Optional[str] = Field(default="Cả ngày", max_length=50)


@router.patch("/{plan_id}/habits/{habit_id}")
async def update_habit(plan_id: str, habit_id: str, request: HabitPatch, user_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    """Toggle habit active/done. KH tự customize."""
    try:
        return CarePlanService.update_habit(user_id, plan_id, habit_id, request.dict(exclude_none=True))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{plan_id}/habits")
async def add_custom_habit(plan_id: str, request: CustomHabitRequest, user_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    """KH tự thêm habit cá nhân."""
    try:
        return CarePlanService.add_custom_habit(user_id, plan_id, request.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
