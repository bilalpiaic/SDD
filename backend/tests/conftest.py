"""
pytest configuration for Xero MCP Chatbot Backend tests.

This configuration sets up pytest with proper markers, fixtures,
and settings for the test-driven development approach.

Constitutional Requirements:
- All tests must pass JSON-RPC 2.0 protocol compliance
- Contract tests must validate MCP-First Integration
- Tests must enforce constitutional requirements
"""

import pytest
import asyncio
from typing import Generator, Dict, Any


def pytest_configure(config):
    """Configure pytest with custom markers."""
    config.addinivalue_line(
        "markers", 
        "contract: Contract tests for API and MCP protocol compliance"
    )
    config.addinivalue_line(
        "markers", 
        "integration: Integration tests for end-to-end workflows"
    )
    config.addinivalue_line(
        "markers", 
        "unit: Unit tests for individual components"
    )
    config.addinivalue_line(
        "markers", 
        "performance: Performance tests for response times"
    )
    config.addinivalue_line(
        "markers", 
        "constitutional: Tests that validate constitutional compliance"
    )


@pytest.fixture(scope="session")
def event_loop() -> Generator[asyncio.AbstractEventLoop, None, None]:
    """Create an instance of the default event loop for the test session."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture
def sample_json_rpc_request() -> Dict[str, Any]:
    """Sample JSON-RPC 2.0 request for testing."""
    return {
        "jsonrpc": "2.0",
        "method": "xero.test.method",
        "params": {"test": "value"},
        "id": 1
    }


@pytest.fixture
def sample_json_rpc_response() -> Dict[str, Any]:
    """Sample JSON-RPC 2.0 response for testing."""
    return {
        "jsonrpc": "2.0",
        "result": {"success": True},
        "id": 1
    }


@pytest.fixture
def constitutional_requirements() -> Dict[str, str]:
    """Constitutional requirements for validation in tests."""
    return {
        "mcp_first_integration": "All Xero operations via MCP Server",
        "json_rpc_protocol": "NON-NEGOTIABLE - JSON-RPC 2.0 only", 
        "wireframe_ui_support": "Data structures for wireframe components",
        "modular_architecture": "Plugin-ready design",
        "extensibility": "Future-proof patterns"
    }


@pytest.fixture
def anyio_backend():
    """Force pytest-anyio to use asyncio backend to avoid requiring trio installation."""
    return "asyncio"