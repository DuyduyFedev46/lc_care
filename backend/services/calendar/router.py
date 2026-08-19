"""Family Calendar API Routes — AI-powered suggestions"""
from fastapi import APIRouter, Depends, HTTPException
from typing import Dict, Any, List
from middleware.auth import get_current_user
from services.calendar.service import CalendarService

router = APIRouter()


@router.get("/suggestions/{family_id}")
async def get_family_suggestions(
    family_id: str, user_id: str = Depends(get_current_user)
) -> List[Dict[str, Any]]:
    """Generate AI batch suggestions for a family's health calendar."""
    try:
        return CalendarService.get_family_suggestions(family_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/suggestions/{family_id}/history")
async def get_suggestions_history(
    family_id: str, user_id: str = Depends(get_current_user)
) -> List[Dict[str, Any]]:
    """Get past calendar suggestions for a family."""
    try:
        return CalendarService.get_suggestions_history(family_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
