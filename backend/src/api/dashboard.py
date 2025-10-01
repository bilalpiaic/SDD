from __future__ import annotations
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Any, Dict, List

from services.dashboard_service import DashboardService
from models import DashboardLayout


router = APIRouter()
dash_service = DashboardService()


class SaveLayoutRequest(BaseModel):
    layout_id: str
    session_id: str
    grid_configuration: List[Dict[str, Any]]
    preferences: Dict[str, Any] | None = None
    is_default: bool = True


@router.post("/layout")
async def save_layout(payload: SaveLayoutRequest):
    layout = DashboardLayout(
        layout_id=payload.layout_id,
        session_id=payload.session_id,
        grid_configuration=payload.grid_configuration,
        preferences=payload.preferences or {},
        is_default=payload.is_default,
    )
    saved = dash_service.save_layout(layout)
    return saved.model_dump()


@router.get("/layout/{layout_id}")
async def get_layout(layout_id: str):
    layout = dash_service.get_layout(layout_id)
    return (layout.model_dump() if layout else {"detail": "Not Found"})
