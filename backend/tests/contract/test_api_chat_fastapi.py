import pytest
from httpx import AsyncClient, ASGITransport
from main import app


@pytest.mark.anyio("asyncio")
async def test_chat_message_returns_conversation():
	transport = ASGITransport(app=app)
	async with AsyncClient(transport=transport, base_url="http://test") as ac:
		resp = await ac.post("/api/v1/chat/message", json={"session_id": "s1", "message": "Show invoices"})
		assert resp.status_code == 200
		data = resp.json()
		assert data["session_id"] == "s1"
		assert data["user_input"] == "Show invoices"
		assert "status" in data


@pytest.mark.anyio("asyncio")
async def test_chat_history_returns_array():
	transport = ASGITransport(app=app)
	async with AsyncClient(transport=transport, base_url="http://test") as ac:
		resp = await ac.get("/api/v1/chat/history", params={"session_id": "s1"})
		assert resp.status_code == 200
		data = resp.json()
		assert data["session_id"] == "s1"
		assert "history" in data
