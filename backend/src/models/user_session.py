from __future__ import annotations
from typing import Any, Dict, List, Optional
from datetime import datetime
from pydantic import BaseModel, Field


class UserSession(BaseModel):
    session_id: str
    xero_organization_id: Optional[str] = None
    oauth_tokens: Dict[str, Any] = Field(default_factory=dict)
    layout_preferences: Dict[str, Any] = Field(default_factory=dict)
    conversation_history: List[str] = Field(default_factory=list)
    permissions: List[str] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: Optional[datetime] = None
