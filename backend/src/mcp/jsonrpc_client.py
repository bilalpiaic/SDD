from __future__ import annotations
from typing import Any, Dict, Optional
import httpx
from pydantic import BaseModel

from models import MCPRequest, MCPResponse, MCPAuthContext


class JSONRPCClient:
    def __init__(self, base_url: str, timeout: float = 15.0):
        self.base_url = base_url.rstrip('/')
        self.timeout = timeout
        self._client = httpx.AsyncClient(timeout=timeout)

    async def call(self, method: str, params: Dict[str, Any], *, auth: Optional[MCPAuthContext] = None, request_id: Optional[str] = None) -> MCPResponse:
        req = MCPRequest(method=method, params=params or {}, id=request_id or "1", auth_context=auth)
        payload = req.model_dump()
        resp = await self._client.post(f"{self.base_url}/rpc", json=payload)
        resp.raise_for_status()
        data = resp.json()
        return MCPResponse.model_validate(data)

    async def aclose(self) -> None:
        await self._client.aclose()

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, tb):
        await self.aclose()
