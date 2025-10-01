from __future__ import annotations
from typing import Any, Optional
from models import MCPAuthContext, MCPResponse
from mcp.jsonrpc_client import JSONRPCClient


class TransactionsService:
    def __init__(self, rpc: JSONRPCClient):
        self.rpc = rpc

    async def list(self, *, org_id: Optional[str] = None, **filters: Any) -> MCPResponse:
        auth = MCPAuthContext(xero_organization_id=org_id)
        return await self.rpc.call("Transactions.GetTransactions", filters, auth=auth)

    async def get(self, transaction_id: str, *, org_id: Optional[str] = None) -> MCPResponse:
        auth = MCPAuthContext(xero_organization_id=org_id)
        return await self.rpc.call("Transactions.GetTransaction", {"transaction_id": transaction_id}, auth=auth)
