import pytest
from datetime import datetime, timedelta
from src.services.session_service import SessionService
from src.models.user_session import UserSession


def test_create_and_get_session():
    svc = SessionService()
    s = UserSession(session_id="s1", user_id="u1", created_at=datetime.utcnow(), expires_at=datetime.utcnow() + timedelta(hours=1), oauth_tokens={})
    svc.create(s)
    assert svc.get("s1") is not None


def test_touch_extends_expiry():
    svc = SessionService()
    expires = datetime.utcnow() + timedelta(minutes=5)
    s = UserSession(session_id="s1", user_id="u1", created_at=datetime.utcnow(), expires_at=expires, oauth_tokens={})
    svc.create(s)
    touched = svc.touch("s1", extend_minutes=10)
    assert touched is not None
    assert touched.expires_at > expires


def test_delete_session():
    svc = SessionService()
    s = UserSession(session_id="s1", user_id="u1", created_at=datetime.utcnow(), expires_at=datetime.utcnow() + timedelta(hours=1), oauth_tokens={})
    svc.create(s)
    assert svc.delete("s1") is True
    assert svc.get("s1") is None
