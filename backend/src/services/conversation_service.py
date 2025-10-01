from __future__ import annotations
from typing import Optional
from models import Conversation, MCPRequest, MCPResponse, MCPAuthContext
from .session_service import SessionService
from mcp.jsonrpc_client import JSONRPCClient


class ConversationService:
    def __init__(self, rpc_client: JSONRPCClient, sessions: SessionService):
        self.rpc = rpc_client
        self.sessions = sessions

    async def process(self, session_id: str, user_input: str) -> Conversation:
        # Basic intent placeholder; real NLP in T036 will replace this
        intent = "generic.query"
        # Lookup session for auth context (stub)
        sess = self.sessions.get(session_id)
        auth = MCPAuthContext(
            xero_organization_id=getattr(sess, "xero_organization_id", None),
            access_token=(sess.oauth_tokens.get("access_token") if sess else None),
            refresh_token=(sess.oauth_tokens.get("refresh_token") if sess else None),
        )

        conv = Conversation(
            conversation_id=f"conv_{session_id}",
            session_id=session_id,
            user_input=user_input,
            interpreted_intent=intent,
            status="executing",
        )
        # Construct and execute MCP request
        req = MCPRequest(method=intent, params={"query": user_input}, id=conv.conversation_id, auth_context=auth)
        conv.mcp_request = req
        resp: MCPResponse = await self.rpc.call(req.method, req.params, auth=auth, request_id=req.id)
        conv.mcp_response = resp
        conv.status = "completed" if resp.error is None else "error"
        # UI response can be normalized later
        conv.ui_response = resp.result
        return conv
