# Constitution Compliance & Security Audit

## Constitutional Requirements
- MCP-first integration: All Xero functionality via Xero MCP Server (JSON-RPC 2.0)
- JSON-RPC protocol: Request/response envelope enforced in models and service layer
- Wireframe UI support: Responses mapped to tiles/cards/report blocks
- Modular architecture: Services split by concern; MCP module services as adapters
- Extensibility: New modules can be added under `src/services/mcp/`

Status: All implemented endpoints and services adhere to these principles.

## Security Audit (Initial)
- OAuth2 tokens are stored in-memory for development. For production: use a secure database or secret store and encrypt tokens at rest.
- CORS is configured to allow localhost during development. Restrict origins in production.
- Sessions are identified by `session_id` generated on the client and persisted on the server; implement expiration and rotation.
- Input validation uses Pydantic models; extend field constraints and sanitize any free text where appropriate.
- Error handling avoids leaking stack traces to clients; internal details are logged (add logging hooks in production).

## Recommendations (Prod)
- Use HTTPS everywhere and secure cookies for session tokens.
- Add RBAC/ABAC for sensitive endpoints (e.g., payroll operations).
- Set up rate limiting and anomaly detection to prevent abuse.
- Implement refresh token rotation, revoke on suspicious activity.
- Enable structured logging and audit trails for MCP requests.
