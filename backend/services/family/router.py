from fastapi import APIRouter, Depends, HTTPException
from typing import Dict, Any, List
from middleware.auth import get_current_user
from services.family.service import FamilyService
from pydantic import BaseModel, Field

router = APIRouter()

class AddMemberRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    relation: str = Field(min_length=1, max_length=50)
    yearOfBirth: int = Field(ge=1900, le=2016)
    gender: str = Field(min_length=1, max_length=10)

class JoinFamilyRequest(BaseModel):
    inviteToken: str = Field(min_length=1, max_length=64)

class CalendarEventRequest(BaseModel):
    dateFull: str = Field(min_length=10, max_length=10)  # "YYYY-MM-DD"
    member: str = Field(min_length=1, max_length=100)
    activity: str = Field(min_length=1, max_length=200)
    location: str = Field(default="", max_length=200)
    color: str = Field(default="#00923F", max_length=9)

@router.get("/")
async def get_family(user_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    try:
        return FamilyService.get_family_info(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
async def add_member(request: AddMemberRequest, user_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    try:
        return FamilyService.add_member(user_id, request.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/invite")
async def create_invite(user_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    """Create a 7-day invite link for this user's family."""
    try:
        return FamilyService.create_invite(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/join")
async def join_family(request: JoinFamilyRequest, user_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    """Join a family using an invite token."""
    try:
        result = FamilyService.join_family_by_invite(user_id, request.inviteToken)
        if not result.get("success"):
            raise HTTPException(status_code=400, detail=result.get("message", "Không thể tham gia gia đình."))
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/calendar")
async def get_calendar(user_id: str = Depends(get_current_user)) -> List[Dict[str, Any]]:
    try:
        return FamilyService.get_calendar(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/calendar")
async def add_calendar_event(request: CalendarEventRequest, user_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    """Add an appointment to the family calendar for a specific date."""
    try:
        return FamilyService.add_calendar_event(user_id, request.dateFull, request.member, request.activity, request.location, request.color)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/calendar/{date_full}/{event_index}")
async def update_calendar_event(date_full: str, event_index: int, request: CalendarEventRequest, user_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    """Update an appointment on the family calendar."""
    try:
        return FamilyService.update_calendar_event(user_id, date_full, event_index, request.dict(exclude_unset=True))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/calendar/{date_full}/{event_index}")
async def delete_calendar_event(date_full: str, event_index: int, user_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    """Delete an appointment from the family calendar."""
    try:
        return FamilyService.delete_calendar_event(user_id, date_full, event_index)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/water/{member_id}")
async def water_for_member(member_id: str, user_id: str = Depends(get_current_user)) -> Dict[str, Any]:
    """
    Task 1.4 / 3.1: Tưới hộ — sender waters plant for a family member.
    - Rate-limited: 1 tưới hộ / người / ngày.
    - Triggers FCM push (WATER_REMINDER) to target.
    - Awards +5 points to sender.
    """
    try:
        result = FamilyService.water_for_member(user_id, member_id)
        if not result.get("success"):
            raise HTTPException(status_code=400, detail=result.get("message", "Không thể tưới hộ."))
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

