from __future__ import annotations
from typing import Any, Optional
from models import MCPAuthContext, MCPResponse
from mcp.jsonrpc_client import JSONRPCClient


class BankFeedsService:
    def __init__(self, rpc: JSONRPCClient):
        self.rpc = rpc

    async def list(self, *, org_id: Optional[str] = None, **filters: Any) -> MCPResponse:
        auth = MCPAuthContext(xero_organization_id=org_id)
        return await self.rpc.call("BankFeeds.GetFeeds", filters, auth=auth)

    async def get(self, feed_id: str, *, org_id: Optional[str] = None) -> MCPResponse:
        auth = MCPAuthContext(xero_organization_id=org_id)
        return await self.rpc.call("BankFeeds.GetFeed", {"feed_id": feed_id}, auth=auth)
