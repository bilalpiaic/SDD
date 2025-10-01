from __future__ import annotations
from typing import Optional
from pydantic import BaseModel


class OAuthTokens(BaseModel):
    access_token: str
    refresh_token: str
    expires_in: int


class XeroOAuthService:
    """Minimal OAuth2 service stub for Phase 3.3.

    Real implementation will handle redirect URIs, token exchange, and refresh.
    """

    def __init__(self, client_id: str, client_secret: str, redirect_uri: str):
        self.client_id = client_id
        self.client_secret = client_secret
        self.redirect_uri = redirect_uri

    async def initiate(self, state: Optional[str] = None) -> str:
        """Return an auth URL to redirect the user to Xero's consent page."""
        # Placeholder URL
        return f"https://login.xero.com/identity/connect/authorize?client_id={self.client_id}&redirect_uri={self.redirect_uri}&response_type=code&scope=openid profile email accounting.settings accounting.transactions offline_access&state={state or 'state'}"

    async def exchange_code(self, code: str) -> OAuthTokens:
        """Exchange authorization code for tokens (stubbed)."""
        # In real code, perform HTTP call to token endpoint
        return OAuthTokens(access_token="stub_access", refresh_token="stub_refresh", expires_in=3600)

    async def refresh(self, refresh_token: str) -> OAuthTokens:
        """Refresh tokens (stubbed)."""
        return OAuthTokens(access_token="stub_access_new", refresh_token=refresh_token, expires_in=3600)
