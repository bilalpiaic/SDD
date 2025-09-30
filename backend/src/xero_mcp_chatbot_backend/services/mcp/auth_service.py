from typing import Dict, Any


class MCPAuthService:
    async def initiate_oauth(self, redirect_uri: str, state: str | None = None) -> Dict[str, Any]:
        return {
            "jsonrpc": "2.0",
            "result": {
                "authorization_url": "https://login.xero.com/identity/connect/authorize?stub=1",
                "state": state or "csrf_state_token",
                "expires_in": 600,
            },
            "id": "auth_init_stub",
        }

    async def handle_oauth_callback(self, code: str, state: str) -> Dict[str, Any]:
        return {
            "jsonrpc": "2.0",
            "result": {
                "access_token": "stub_access_token",
                "refresh_token": "stub_refresh_token",
                "expires_in": 1800,
                "token_type": "Bearer",
                "scope": "accounting.transactions",
            },
            "id": "auth_callback_stub",
        }

    async def validate_token(self, token: str) -> bool:
        return False

    async def refresh_token(self, refresh_token: str) -> Dict[str, Any]:
        return {
            "jsonrpc": "2.0",
            "result": {
                "access_token": "stub_new_access_token",
                "refresh_token": "stub_new_refresh_token",
                "expires_in": 1800,
            },
            "id": "auth_refresh_stub",
        }

    async def logout(self) -> Dict[str, Any]:
        return {"jsonrpc": "2.0", "result": {"success": True}, "id": "auth_logout_stub"}
