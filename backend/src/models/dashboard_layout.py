from __future__ import annotations
from typing import Any, Dict, List, Optional
from datetime import datetime
from pydantic import BaseModel, Field


class DashboardLayout(BaseModel):
    layout_id: str
    session_id: str
    grid_configuration: List[Dict[str, Any]] = Field(default_factory=list)
    preferences: Dict[str, Any] = Field(default_factory=dict)
    is_default: bool = False
    last_modified: datetime = Field(default_factory=datetime.utcnow)
