from __future__ import annotations
from typing import Dict, Optional
from datetime import datetime
from models import DashboardLayout


class DashboardService:
    def __init__(self):
        self._layouts: Dict[str, DashboardLayout] = {}

    def save_layout(self, layout: DashboardLayout) -> DashboardLayout:
        layout.last_modified = datetime.utcnow()
        self._layouts[layout.layout_id] = layout
        return layout

    def get_layout(self, layout_id: str) -> Optional[DashboardLayout]:
        return self._layouts.get(layout_id)

    def get_by_session(self, session_id: str) -> Optional[DashboardLayout]:
        # naive scan; replace with persistent store later
        for lay in self._layouts.values():
            if lay.session_id == session_id and lay.is_default:
                return lay
        return None
