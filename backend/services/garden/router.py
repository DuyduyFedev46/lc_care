from fastapi import APIRouter, Depends, HTTPException
from typing import Dict, Any, List
from middleware.auth import get_current_user
from services.garden.service import GardenService
from pydantic import BaseModel, Field

router = APIRouter()

class WaterRequest(BaseModel):
    habitId: str = Field(min_length=1, max_length=100)

@router.get("/")
async def get_garden(user_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    try:
        return GardenService.get_garden_summary(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/water")
async def water_plant(request: WaterRequest, user_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    try:
        return GardenService.water_plant(user_id, request.habitId)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/streak")
async def get_streak(user_id: str = Depends(get_current_user)) -> List[Dict[str, Any]]:
    try:
        return GardenService.get_streak(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/badges")
async def get_badges(user_id: str = Depends(get_current_user)) -> List[Dict[str, Any]]:
    try:
        return GardenService.get_badges(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/achievements")
async def get_achievements(user_id: str = Depends(get_current_user)) -> List[Dict[str, Any]]:
    try:
        return GardenService.get_achievements(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/quests")
async def get_quests(user_id: str = Depends(get_current_user)) -> List[Dict[str, Any]]:
    try:
        return GardenService.get_quests(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/simulate-streak")
async def simulate_streak(user_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    try:
        return GardenService.simulate_streak_increase(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
