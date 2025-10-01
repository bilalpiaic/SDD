"""
Compatibility shim for tests and local runs.

Expose the FastAPI application instance from src.main so there is a single
authoritative app wiring (routers, prefixes, middleware). This prevents the
duplicate/older backend.main definition from diverging from src.main.
"""

from src.main import app  # re-export the primary application

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
    )
