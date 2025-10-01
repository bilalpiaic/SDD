from __future__ import annotations
from typing import Any, Dict, Optional, Literal
from pydantic import BaseModel, Field


class JSONRPCError(BaseModel):
    code: int
    message: str
    data: Optional[Any] = None


class MCPAuthContext(BaseModel):
    xero_organization_id: Optional[str] = None
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None


class MCPRequest(BaseModel):
    jsonrpc: Literal["2.0"] = "2.0"
    method: str
    params: Dict[str, Any] = Field(default_factory=dict)
    id: str
    auth_context: Optional[MCPAuthContext] = None


class MCPResponse(BaseModel):
    jsonrpc: Literal["2.0"] = "2.0"
    result: Optional[Any] = None
    error: Optional[JSONRPCError] = None
    id: str
