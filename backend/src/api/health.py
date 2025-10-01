from __future__ import annotations
from fastapi import APIRouter


router = APIRouter()


@router.get("/health")
async def health():
    return {"status": "ok"}


@router.get("/status")
async def status():
    return {"mcp": {"connected": False}, "backend": {"version": "1.0.0"}}
