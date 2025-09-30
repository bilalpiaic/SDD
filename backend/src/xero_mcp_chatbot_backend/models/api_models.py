from typing import Optional, Dict, Any
from pydantic import BaseModel, Field


class AuthInitiateRequest(BaseModel):
    redirect_uri: str
    state: Optional[str] = None


class AuthInitiateResponse(BaseModel):
    authorization_url: str
    state: str
    expires_in: int = 600
    wireframe_data: Dict[str, Any] = Field(default_factory=dict)


class AuthCallbackRequest(BaseModel):
    code: str
    state: str


class AuthCallbackResponse(BaseModel):
    access_token: str
    refresh_token: str
    expires_in: int
    token_type: str = "Bearer"
    scope: Optional[str] = None
    wireframe_data: Dict[str, Any] = Field(default_factory=dict)


class AuthStatusResponse(BaseModel):
    authenticated: bool
    user: Optional[Dict[str, Any]] = None
    wireframe_data: Dict[str, Any] = Field(default_factory=dict)
