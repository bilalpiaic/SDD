from __future__ import annotations
from typing import Any, Optional
from models import MCPAuthContext, MCPResponse
from mcp.jsonrpc_client import JSONRPCClient


class ReportsService:
    def __init__(self, rpc: JSONRPCClient):
        self.rpc = rpc

    async def generate(self, report_type: str, *, org_id: Optional[str] = None, **params: Any) -> MCPResponse:
        auth = MCPAuthContext(xero_organization_id=org_id)
        return await self.rpc.call("Reports.Generate", {"report_type": report_type, **params}, auth=auth)
