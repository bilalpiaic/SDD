from __future__ import annotations
from fastapi import APIRouter
from pydantic import BaseModel

from services.session_service import SessionService
from services.conversation_service import ConversationService
from mcp.jsonrpc_client import JSONRPCClient


router = APIRouter()
sessions = SessionService()
rpc_client = JSONRPCClient(base_url="http://localhost:9000")  # MCP server URL placeholder
conv_service = ConversationService(rpc_client, sessions)


class MessageRequest(BaseModel):
    session_id: str
    message: str


@router.post("/message")
async def send_message(payload: MessageRequest):
    # Ensure session exists
    if not sessions.get(payload.session_id):
        from models import UserSession

        sessions.create(UserSession(session_id=payload.session_id))
    else:
        sessions.touch(payload.session_id)
    conv = await conv_service.process(payload.session_id, payload.message)
    return conv.model_dump()


class HistoryRequest(BaseModel):
    session_id: str


@router.get("/history")
async def chat_history(session_id: str):
    # Placeholder: return empty or future persisted conversations
    s = sessions.get(session_id)
    if s:
        sessions.touch(session_id)
    return {"session_id": session_id, "history": (s.conversation_history if s else [])}
