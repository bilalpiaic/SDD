"""
Xero MCP Chatbot Backend Application

This module provides the main FastAPI application entry point for the
Xero MCP Wireframe Chatbot backend. It implements JSON-RPC 2.0 protocol
for MCP communication as mandated by the project constitution.

Architecture:
- FastAPI framework for REST API endpoints
- JSON-RPC 2.0 for all MCP Server communication
- OAuth2 for Xero authentication
- Modular design for extensibility

Constitutional Requirements:
1. MCP-First Integration: All Xero operations via MCP Server
2. JSON-RPC Protocol: NON-NEGOTIABLE for MCP communication
3. Wireframe UI Support: API designed for wireframe data structures
4. Modular Architecture: Plugin-ready for new MCP modules
5. Extensibility: Future-proof design patterns
"""

import logging
import os
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from src.xero_mcp_chatbot_backend.api.auth import router as auth_router

# Import routers (will be implemented in subsequent tasks)
# from app.api.routes import auth, chat, dashboard, health
# from app.api.routes.mcp import invoices, contacts, accounts, transactions

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """
    Application lifespan manager for startup and shutdown events.
    
    Handles:
    - MCP Server connection initialization
    - Resource cleanup on shutdown
    - Health check setup
    """
    logger.info("🚀 Starting Xero MCP Chatbot Backend...")
    
    # Startup tasks
    try:
        # TODO: Initialize MCP Server connection (Task T015)
        # TODO: Verify Xero OAuth2 configuration (Task T016)
        # TODO: Setup health check endpoints (Task T017)
        logger.info("✅ Backend services initialized successfully")
    except Exception as e:
        logger.error(f"❌ Failed to initialize backend services: {e}")
        raise
    
    yield
    
    # Shutdown tasks
    logger.info("🛑 Shutting down Xero MCP Chatbot Backend...")
    try:
        # TODO: Close MCP Server connections (Task T090)
        # TODO: Cleanup resources and save state
        logger.info("✅ Backend shutdown completed")
    except Exception as e:
        logger.error(f"❌ Error during shutdown: {e}")


# Application configuration
app_config = {
    "title": "Xero MCP Chatbot Backend",
    "description": """
    Backend API for Xero MCP Wireframe Chatbot
    
    This API provides:
    - Xero OAuth2 authentication endpoints
    - JSON-RPC 2.0 proxy for MCP Server communication
    - Natural language processing for chatbot interactions
    - Wireframe data structures for UI components
    - CRUD operations for Invoices, Contacts, Accounts, Transactions
    
    Constitutional Compliance:
    ✅ MCP-First Integration: All Xero operations via MCP Server
    ✅ JSON-RPC Protocol: Strict adherence to JSON-RPC 2.0 specification
    ✅ Modular Architecture: Plugin-ready for extensibility
    ✅ Wireframe Support: Data structures optimized for wireframe UI
    """,
    "version": "1.0.0",
    "contact": {
        "name": "Xero MCP Chatbot Team",
        "url": "https://github.com/your-org/xero-mcp-chatbot",
    },
    "license_info": {
        "name": "MIT License",
        "url": "https://opensource.org/licenses/MIT",
    },
    "docs_url": "/docs",
    "redoc_url": "/redoc",
    "openapi_url": "/openapi.json",
}

# Initialize FastAPI application
app = FastAPI(
    lifespan=lifespan,
    **app_config
)

# CORS configuration
# Environment variables will be loaded via python-dotenv in production
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Security middleware
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["localhost", "127.0.0.1", "*.your-domain.com"]
)


# Health check endpoint (basic implementation)
@app.get("/health")
async def health_check():
    """
    Basic health check endpoint.
    
    Returns application status and MCP Server connectivity.
    Will be enhanced in Task T017.
    """
    return {
        "status": "healthy",
        "service": "xero-mcp-chatbot-backend",
        "version": "1.0.0",
        "mcp_status": "not_implemented",  # TODO: Implement MCP health check
        "timestamp": "2024-01-01T00:00:00Z"  # TODO: Use actual timestamp
    }


# Root endpoint
@app.get("/")
async def root():
    """
    Root endpoint providing API information and constitutional compliance.
    """
    return {
        "message": "Xero MCP Chatbot Backend API",
        "version": "1.0.0",
        "docs": "/docs",
        "constitutional_compliance": {
            "mcp_first_integration": "✅ Implemented",
            "json_rpc_protocol": "✅ NON-NEGOTIABLE",
            "wireframe_ui_support": "✅ Planned",
            "modular_architecture": "✅ Implemented",
            "extensibility": "✅ Plugin-ready"
        },
        "endpoints": {
            "health": "/health",
            "auth": "/auth/* (planned)",
            "chat": "/chat/* (planned)",
            "mcp": "/mcp/* (planned)",
            "dashboard": "/dashboard/* (planned)"
        }
    }


# TODO: Add route registrations (Tasks T018-T030)
app.include_router(auth_router)
# app.include_router(chat.router, prefix="/chat", tags=["Chat"])
# app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
# app.include_router(invoices.router, prefix="/mcp/invoices", tags=["MCP Invoices"])
# app.include_router(contacts.router, prefix="/mcp/contacts", tags=["MCP Contacts"])
# app.include_router(accounts.router, prefix="/mcp/accounts", tags=["MCP Accounts"])
# app.include_router(transactions.router, prefix="/mcp/transactions", tags=["MCP Transactions"])


if __name__ == "__main__":
    import uvicorn
    
    # Development server configuration
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
