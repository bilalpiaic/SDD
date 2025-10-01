from __future__ import annotations
from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field


class ModuleGroup(BaseModel):
    group_id: str
    group_name: str
    mcp_module: Optional[str] = None
    position: Optional[dict] = None
    is_expanded: bool = True
    element_count: int = 0
    last_updated: Optional[datetime] = None
