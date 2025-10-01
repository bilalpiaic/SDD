import pytest
from httpx import AsyncClient, ASGITransport
from main import app


@pytest.mark.anyio("asyncio")
async def test_auth_initiate_and_exchange():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        resp = await ac.post("/api/v1/auth/oauth/initiate", json={"state": "abc"})
        assert resp.status_code == 200
        assert "auth_url" in resp.json()

        resp2 = await ac.post("/api/v1/auth/oauth/exchange", json={"code": "dummy"})
        assert resp2.status_code == 200
        data2 = resp2.json()
        assert "access_token" in data2 and "refresh_token" in data2