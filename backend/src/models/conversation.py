from __future__ import annotations
from typing import Any, Optional
from datetime import datetime
from pydantic import BaseModel, Field

from .mcp_models import MCPRequest, MCPResponse


class Conversation(BaseModel):
    conversation_id: str
    session_id: str
    user_input: str
    interpreted_intent: Optional[str] = None
    mcp_request: Optional[MCPRequest] = None
    mcp_response: Optional[MCPResponse] = None
    ui_response: Optional[Any] = None
    status: str = "processing"
    timestamp: datetime = Field(default_factory=datetime.utcnow)
