import pytest
from datetime import datetime
from src.services.dashboard_service import DashboardService
from src.models.dashboard_layout import DashboardLayout


def test_save_and_get_layout():
    svc = DashboardService()
    layout = DashboardLayout(
        layout_id="default",
        session_id="s1",
        grid_configuration=[{"id": "w1", "type": "Metric"}],
        preferences={},
        is_default=True,
        last_modified=datetime.utcnow(),
    )
    saved = svc.save_layout(layout)
    assert saved.layout_id == "default"
    fetched = svc.get_layout("default")
    assert fetched is not None
    assert fetched.grid_configuration[0]["id"] == "w1"


def test_get_by_session_prefers_default():
    svc = DashboardService()
    l1 = DashboardLayout(
        layout_id="A",
        session_id="s1",
        grid_configuration=[],
        preferences={},
        is_default=True,
        last_modified=datetime.utcnow(),
    )
    l2 = DashboardLayout(
        layout_id="B",
        session_id="s1",
        grid_configuration=[],
        preferences={},
        is_default=False,
        last_modified=datetime.utcnow(),
    )
    svc.save_layout(l1)
    svc.save_layout(l2)
    res = svc.get_by_session("s1")
    assert res is not None
    assert res.layout_id == "A"
