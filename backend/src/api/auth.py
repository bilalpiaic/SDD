from __future__ import annotations
from fastapi import APIRouter
from pydantic import BaseModel
from auth.xero_oauth import XeroOAuthService


router = APIRouter()
oauth_service = XeroOAuthService(client_id="stub_id", client_secret="stub_secret", redirect_uri="http://localhost:8000/callback")


class InitiateRequest(BaseModel):
    state: str | None = None


@router.post("/oauth/initiate")
async def oauth_initiate(payload: InitiateRequest):
    url = await oauth_service.initiate(state=payload.state)
    return {"auth_url": url}


class ExchangeRequest(BaseModel):
    code: str


@router.post("/oauth/exchange")
async def oauth_exchange(payload: ExchangeRequest):
    tokens = await oauth_service.exchange_code(payload.code)
    return tokens.model_dump()
