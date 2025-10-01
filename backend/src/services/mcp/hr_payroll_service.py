from __future__ import annotations
from typing import Any, Optional
from models import MCPAuthContext, MCPResponse
from mcp.jsonrpc_client import JSONRPCClient


class HRPayrollService:
    def __init__(self, rpc: JSONRPCClient):
        self.rpc = rpc

    async def list_runs(self, *, org_id: Optional[str] = None, **filters: Any) -> MCPResponse:
        auth = MCPAuthContext(xero_organization_id=org_id)
        return await self.rpc.call("HRPayroll.GetRuns", filters, auth=auth)

    async def get_run(self, run_id: str, *, org_id: Optional[str] = None) -> MCPResponse:
        auth = MCPAuthContext(xero_organization_id=org_id)
        return await self.rpc.call("HRPayroll.GetRun", {"run_id": run_id}, auth=auth)
