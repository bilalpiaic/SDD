import pytest
from httpx import AsyncClient, ASGITransport
from main import app


@pytest.mark.anyio("asyncio")
async def test_health_ok():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        resp = await ac.get("/api/v1/health")
        assert resp.status_code == 200
        assert resp.json()["status"] == "ok"


@pytest.mark.anyio("asyncio")
async def test_status_returns_backend_info():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        resp = await ac.get("/api/v1/status")
        assert resp.status_code == 200
        data = resp.json()
        assert "backend" in data and data["backend"]["version"] == "1.0.0"