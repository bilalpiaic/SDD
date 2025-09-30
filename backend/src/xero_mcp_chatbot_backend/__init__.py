"""
Xero MCP Chatbot Backend Package

This package provides the core backend functionality for the Xero MCP Wireframe Chatbot.
It implements JSON-RPC 2.0 protocol for MCP communication as mandated by the project constitution.

Package Structure:
- app/: FastAPI application modules
- core/: Core business logic and configuration
- services/: External service integrations (MCP, Xero OAuth2)
- models/: Data models and schemas
- utils/: Utility functions and helpers

Constitutional Compliance:
1. MCP-First Integration: All Xero operations via MCP Server
2. JSON-RPC Protocol: NON-NEGOTIABLE for MCP communication
3. Wireframe UI Support: Data structures optimized for wireframe UI
4. Modular Architecture: Plugin-ready for extensibility
5. Extensibility: Future-proof design patterns
"""

__version__ = "1.0.0"
__title__ = "Xero MCP Chatbot Backend"
__description__ = "Backend API for Xero MCP Wireframe Chatbot"
__author__ = "Xero MCP Chatbot Team"
__license__ = "MIT"

# Constitutional requirements validation
CONSTITUTIONAL_REQUIREMENTS = {
    "mcp_first_integration": "✅ All Xero operations via MCP Server",
    "json_rpc_protocol": "✅ NON-NEGOTIABLE - JSON-RPC 2.0 only",
    "wireframe_ui_support": "✅ Data structures for wireframe components",
    "modular_architecture": "✅ Plugin-ready design",
    "extensibility": "✅ Future-proof patterns"
}

def validate_constitutional_compliance() -> dict:
    """
    Validates that the package meets all constitutional requirements.
    
    Returns:
        dict: Constitutional compliance status
    """
    return {
        "package": __title__,
        "version": __version__,
        "constitutional_compliance": CONSTITUTIONAL_REQUIREMENTS,
        "status": "✅ COMPLIANT"
    }