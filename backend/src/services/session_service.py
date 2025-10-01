from __future__ import annotations
from typing import Dict, Optional
from datetime import datetime, timedelta
from models import UserSession


class SessionService:
    def __init__(self):
        self._sessions: Dict[str, UserSession] = {}

    def create(self, session: UserSession) -> UserSession:
        self._sessions[session.session_id] = session
        return session

    def get(self, session_id: str) -> Optional[UserSession]:
        return self._sessions.get(session_id)

    def touch(self, session_id: str, *, extend_minutes: int = 240) -> Optional[UserSession]:
        s = self._sessions.get(session_id)
        if not s:
            return None
        s.expires_at = datetime.utcnow() + timedelta(minutes=extend_minutes)
        self._sessions[session_id] = s
        return s

    def delete(self, session_id: str) -> bool:
        return self._sessions.pop(session_id, None) is not None
