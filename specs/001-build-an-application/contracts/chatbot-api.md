# Chatbot API Contract

**Contract**: Backend API for natural language processing and MCP integration  
**Version**: 1.0.0  
**Base URL**: `/api/v1`

## Authentication Endpoints

### POST /auth/oauth/initiate
**Purpose**: Initiate OAuth2 flow with Xero  
**Request**:
```json
{
  "return_url": "https://app.example.com/dashboard"
}
```
**Response** (200):
```json
{
  "authorization_url": "https://login.xero.com/identity/connect/authorize?...",
  "state": "random-state-token"
}
```

### POST /auth/oauth/callback
**Purpose**: Handle OAuth2 authorization code exchange  
**Request**:
```json
{
  "code": "authorization-code",
  "state": "random-state-token"
}
```
**Response** (200):
```json
{
  "session_id": "sess_abc123",
  "organization": {
    "id": "org_xyz789",
    "name": "Acme Corp",
    "currency": "USD"
  },
  "expires_at": "2025-09-30T18:00:00Z"
}
```

### POST /auth/refresh
**Purpose**: Refresh expired OAuth2 tokens  
**Headers**: `Authorization: Bearer <session_token>`  
**Response** (200):
```json
{
  "success": true,
  "expires_at": "2025-09-30T22:00:00Z"
}
```

## Conversation Endpoints

### POST /chat/message
**Purpose**: Process natural language input and return wireframe data  
**Headers**: `Authorization: Bearer <session_token>`  
**Request**:
```json
{
  "message": "show me unpaid invoices",
  "conversation_id": "conv_123abc"
}
```
**Response** (200):
```json
{
  "conversation_id": "conv_123abc",
  "intent": {
    "action": "get_invoices",
    "module": "accounting",
    "filters": {"status": "unpaid"}
  },
  "elements": [
    {
      "element_id": "elem_001",
      "type": "tile",
      "data": {
        "invoice_id": "INV-001",
        "contact_name": "ABC Ltd",
        "amount_due": 500.00,
        "due_date": "2025-10-15",
        "status": "unpaid"
      }
    }
  ],
  "response_text": "Found 3 unpaid invoices totaling $1,500.00"
}
```

### GET /chat/history
**Purpose**: Retrieve conversation history for session  
**Headers**: `Authorization: Bearer <session_token>`  
**Query Parameters**: `limit=20&offset=0`  
**Response** (200):
```json
{
  "conversations": [
    {
      "conversation_id": "conv_123abc",
      "user_input": "show me unpaid invoices",
      "response_text": "Found 3 unpaid invoices",
      "element_count": 3,
      "timestamp": "2025-09-30T14:30:00Z"
    }
  ],
  "total": 5,
  "has_more": true
}
```

## Dashboard Endpoints

### GET /dashboard/layout
**Purpose**: Retrieve user's dashboard layout preferences  
**Headers**: `Authorization: Bearer <session_token>`  
**Response** (200):
```json
{
  "layout_id": "layout_abc123",
  "grid_configuration": {
    "invoices": {"x": 0, "y": 0, "width": 2, "height": 2},
    "reports": {"x": 2, "y": 0, "width": 2, "height": 1}
  },
  "module_groups": [
    {
      "group_id": "group_invoices",
      "name": "Invoices",
      "mcp_module": "accounting",
      "position": {"x": 0, "y": 0},
      "is_expanded": true,
      "element_count": 5
    }
  ]
}
```

### PUT /dashboard/layout
**Purpose**: Update dashboard layout preferences  
**Headers**: `Authorization: Bearer <session_token>`  
**Request**:
```json
{
  "grid_configuration": {
    "invoices": {"x": 1, "y": 0, "width": 2, "height": 2},
    "reports": {"x": 0, "y": 0, "width": 1, "height": 2}
  }
}
```
**Response** (200):
```json
{
  "success": true,
  "layout_id": "layout_abc123",
  "updated_at": "2025-09-30T14:45:00Z"
}
```

## MCP Integration Endpoints (Internal)

### POST /mcp/request
**Purpose**: Internal endpoint for JSON-RPC MCP requests  
**Headers**: `Authorization: Bearer <session_token>`  
**Request**:
```json
{
  "jsonrpc": "2.0",
  "method": "Invoices.GetInvoices",
  "params": {
    "status": "unpaid",
    "page": 1,
    "per_page": 20
  },
  "id": 1
}
```
**Response** (200):
```json
{
  "jsonrpc": "2.0",
  "result": {
    "invoices": [...],
    "total": 3,
    "page": 1
  },
  "id": 1
}
```

## Error Responses

### 401 Unauthorized
```json
{
  "error": "unauthorized",
  "message": "Invalid or expired session token",
  "code": "AUTH_REQUIRED"
}
```

### 400 Bad Request
```json
{
  "error": "bad_request",
  "message": "Unable to interpret command",
  "details": {
    "user_input": "show me stuff",
    "clarification": "Please specify what information you'd like to see (invoices, contacts, reports, etc.)"
  },
  "code": "AMBIGUOUS_INTENT"
}
```

### 429 Rate Limited
```json
{
  "error": "rate_limited",
  "message": "Too many requests",
  "retry_after": 60,
  "code": "RATE_LIMIT_EXCEEDED"
}
```

### 503 Service Unavailable
```json
{
  "error": "service_unavailable",
  "message": "Xero MCP service temporarily unavailable",
  "code": "MCP_UNAVAILABLE"
}
```

## Contract Validation Rules

### Request Validation
- All requests must include valid session token in Authorization header
- Natural language input limited to 500 characters
- Layout coordinates must be non-negative integers
- MCP requests must conform to JSON-RPC 2.0 specification

### Response Guarantees
- All responses include appropriate HTTP status codes
- Error responses always include machine-readable error codes
- Conversation responses always include conversation_id for tracking
- Element data always includes required fields (id, type, data)

### Performance Contracts
- Chat message processing: < 2 seconds response time
- Dashboard layout updates: < 500ms response time  
- OAuth2 token refresh: < 1 second response time
- Error responses: < 200ms response time

---

**Dependencies**: 
- Xero OAuth2 endpoints for authentication
- Xero MCP Server for JSON-RPC requests
- Session storage for token and layout persistence