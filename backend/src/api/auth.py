from __future__ import annotations
from fastapi import APIRouter
from pydantic import BaseModel
from auth.xero_oauth import XeroOAuthService
from services.session_service import SessionService
from models import UserSession


router = APIRouter()
oauth_service = XeroOAuthService(client_id="stub_id", client_secret="stub_secret", redirect_uri="http://localhost:8000/callback")
sessions = SessionService()


class InitiateRequest(BaseModel):
    state: str | None = None


@router.post("/oauth/initiate")
async def oauth_initiate(payload: InitiateRequest):
    url = await oauth_service.initiate(state=payload.state)
    return {"auth_url": url}


class ExchangeRequest(BaseModel):
    code: str
    session_id: str | None = None


@router.post("/oauth/exchange")
async def oauth_exchange(payload: ExchangeRequest):
    tokens = await oauth_service.exchange_code(payload.code)
    # Persist tokens to session if provided
    if payload.session_id:
        s = sessions.get(payload.session_id)
        if not s:
            s = UserSession(session_id=payload.session_id)
            sessions.create(s)
        s.oauth_tokens = tokens.model_dump()
        sessions.create(s)
    return tokens.model_dump()
