from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any

router = APIRouter(prefix="/auth", tags=["Authentication"])


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


@router.post("/oauth/initiate", response_model=AuthInitiateResponse)
async def initiate_oauth(payload: AuthInitiateRequest) -> AuthInitiateResponse:
    # Stub: Return a placeholder response to move tests from SKIP to FAIL/PASS later
    return AuthInitiateResponse(
        authorization_url="https://login.xero.com/identity/connect/authorize?stub=1",
        state=payload.state or "csrf_state_token",
        expires_in=600,
        wireframe_data={
            "redirect_type": "external",
            "button_text": "Connect to Xero",
            "status": "pending",
        },
    )


@router.get("/oauth/callback", response_model=AuthCallbackResponse)
async def oauth_callback(code: str, state: str) -> AuthCallbackResponse:
    # Stub response
    return AuthCallbackResponse(
        access_token="stub_access_token",
        refresh_token="stub_refresh_token",
        expires_in=1800,
        token_type="Bearer",
        scope="accounting.transactions",
        wireframe_data={
            "ui_state": "authenticated",
            "user_message": "Connected to Xero (stub)",
            "redirect_url": "/dashboard",
            "show_success": True,
        },
    )


@router.get("/status", response_model=AuthStatusResponse)
async def auth_status() -> AuthStatusResponse:
    return AuthStatusResponse(
        authenticated=False,
        user=None,
        wireframe_data={"ui_state": "unauthenticated"},
    )


@router.post("/refresh", response_model=AuthCallbackResponse)
async def refresh_token() -> AuthCallbackResponse:
    return AuthCallbackResponse(
        access_token="stub_new_access_token",
        refresh_token="stub_new_refresh_token",
        expires_in=1800,
        token_type="Bearer",
        scope="accounting.transactions",
        wireframe_data={"ui_state": "token_refreshed"},
    )


@router.post("/logout")
async def logout() -> Dict[str, Any]:
    return {"success": True, "wireframe_data": {"ui_state": "logged_out"}}
