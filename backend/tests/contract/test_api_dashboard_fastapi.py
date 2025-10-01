import pytest
from httpx import AsyncClient, ASGITransport
from main import app


@pytest.mark.anyio("asyncio")
async def test_dashboard_save_and_get_layout():
	payload = {
		"layout_id": "dash1",
		"session_id": "s1",
		"grid_configuration": [{"id": "w1"}],
		"is_default": True,
	}
	transport = ASGITransport(app=app)
	async with AsyncClient(transport=transport, base_url="http://test") as ac:
		resp = await ac.post("/api/v1/dashboard/layout", json=payload)
		assert resp.status_code == 200
		data = resp.json()
		assert data["layout_id"] == "dash1"

		resp2 = await ac.get("/api/v1/dashboard/layout/dash1")
		assert resp2.status_code == 200
		data2 = resp2.json()
		assert data2["layout_id"] == "dash1"
