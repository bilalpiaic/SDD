# API Documentation

This documentation is derived from the contract specifications in `specs/001-build-an-application/contracts/`.

- Chatbot API: `specs/001-build-an-application/contracts/chatbot-api.md`
- MCP JSON-RPC Contract: `specs/001-build-an-application/contracts/mcp-jsonrpc.md`

Quick links:
- Backend base URL (dev): http://localhost:8000
- Frontend base URL (dev): http://localhost:3000

Notes:
- OAuth2 endpoints are stubbed and session tokens are stored in-memory for development.
- MCP calls are routed via JSON-RPC client; when MCP is unavailable, ConversationService returns a structured error payload.
