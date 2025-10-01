import pytest
import anyio
from src.services.conversation_service import ConversationService
from src.services.session_service import SessionService
from src.mcp.jsonrpc_client import JSONRPCClient
from src.models.user_session import UserSession
from datetime import datetime, timedelta


class DummyRPC(JSONRPCClient):
    def __init__(self):
        pass

    async def call(self, method, params, auth=None, request_id=None):
        # echo back result
        return type("Resp", (), {"id": request_id, "result": {"echo": params.get("query")}, "error": None})()


@pytest.mark.anyio
async def test_process_success():
    rpc = DummyRPC()
    sessions = SessionService()
    svc = ConversationService(rpc, sessions)
    sessions.create(UserSession(session_id="s1", user_id="u1", created_at=datetime.utcnow(), expires_at=datetime.utcnow()+timedelta(hours=1), oauth_tokens={}))
    conv = await svc.process("s1", "hello world")
    assert conv.status == "completed"
    assert conv.ui_response == {"echo": "hello world"}


@pytest.mark.anyio
async def test_process_handles_rpc_error():
    class FailingRPC(JSONRPCClient):
        def __init__(self):
            pass
        async def call(self, method, params, auth=None, request_id=None):
            raise RuntimeError("RPC down")

    svc = ConversationService(FailingRPC(), SessionService())
    conv = await svc.process("s1", "question")
    assert conv.status == "error"
    assert isinstance(conv.ui_response, dict)
    assert conv.ui_response.get("error")
