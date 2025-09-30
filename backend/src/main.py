"""
Xero MCP Wireframe Chatbot Backend

A FastAPI application that provides a conversational interface to Xero accounting data
through the Xero MCP Server using JSON-RPC protocol.

Constitutional Requirements:
- MCP-First Integration: All Xero functionality via Xero-MCP-Server
- JSON-RPC Protocol: All MCP requests use JSON-RPC 2.0
- Wireframe UI Support: API responses optimized for tiles/cards/report blocks
- Modular Architecture: Clear separation of concerns
- Extensibility: Plugin architecture for new MCP modules
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

# Import API routers
from src.api.auth import router as auth_router
from src.api.chat import router as chat_router
from src.api.dashboard import router as dashboard_router
from src.api.health import router as health_router

# Initialize FastAPI app
app = FastAPI(
    title="Xero MCP Wireframe Chatbot API",
    description="Conversational interface to Xero accounting data via MCP JSON-RPC",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(chat_router, prefix="/api/v1/chat", tags=["Chat"])
app.include_router(dashboard_router, prefix="/api/v1/dashboard", tags=["Dashboard"])
app.include_router(health_router, prefix="/api/v1", tags=["Health"])

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Xero MCP Wireframe Chatbot API",
        "version": "1.0.0",
        "docs": "/docs",
        "constitutional_compliance": {
            "mcp_first": True,
            "json_rpc_protocol": "2.0",
            "wireframe_ui": True,
            "modular_architecture": True,
            "extensible": True
        }
    }

if __name__ == "__main__":
    # Development server configuration
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )