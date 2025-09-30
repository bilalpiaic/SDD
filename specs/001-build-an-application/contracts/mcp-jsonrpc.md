# MCP JSON-RPC Contract

**Contract**: Xero MCP Server JSON-RPC Interface  
**Version**: 1.0.0  
**Protocol**: JSON-RPC 2.0

## Request Structure

### Standard Request Format
```json
{
  "jsonrpc": "2.0",
  "method": "<Module>.<Action>",
  "params": {
    // Module-specific parameters
  },
  "id": <unique_request_id>
}
```

### Authentication Context
All requests must include authentication in params:
```json
{
  "params": {
    "auth": {
      "access_token": "xero_oauth2_token",
      "organization_id": "xero_org_id"
    },
    // ... other parameters
  }
}
```

## Accounting Module

### Invoices.GetInvoices
**Purpose**: Retrieve invoices with optional filtering  
**Request**:
```json
{
  "jsonrpc": "2.0",
  "method": "Invoices.GetInvoices",
  "params": {
    "auth": {"access_token": "...", "organization_id": "..."},
    "status": "unpaid|paid|voided|all",
    "contact_id": "optional_contact_filter",
    "date_from": "2025-01-01",
    "date_to": "2025-12-31",
    "page": 1,
    "per_page": 20
  },
  "id": 1
}
```
**Response**:
```json
{
  "jsonrpc": "2.0",
  "result": {
    "invoices": [
      {
        "invoice_id": "INV-001",
        "contact_name": "ABC Ltd",
        "contact_id": "contact_123",
        "amount_due": 500.00,
        "total": 500.00,
        "due_date": "2025-10-15",
        "status": "unpaid",
        "currency": "USD"
      }
    ],
    "total_count": 25,
    "page": 1,
    "per_page": 20
  },
  "id": 1
}
```

### Invoices.CreateInvoice
**Purpose**: Create new invoice  
**Request**:
```json
{
  "jsonrpc": "2.0",
  "method": "Invoices.CreateInvoice",
  "params": {
    "auth": {"access_token": "...", "organization_id": "..."},
    "contact_id": "contact_123",
    "due_date": "2025-10-15",
    "line_items": [
      {
        "description": "Consulting services",
        "quantity": 1,
        "unit_amount": 500.00,
        "account_code": "200"
      }
    ]
  },
  "id": 2
}
```

### Contacts.GetContacts
**Purpose**: Retrieve contacts list  
**Request**:
```json
{
  "jsonrpc": "2.0",
  "method": "Contacts.GetContacts",
  "params": {
    "auth": {"access_token": "...", "organization_id": "..."},
    "contact_type": "customer|supplier|all",
    "name_filter": "optional_search_term",
    "page": 1,
    "per_page": 50
  },
  "id": 3
}
```

## Reports Module

### Reports.GetBalanceSheet
**Purpose**: Generate balance sheet report  
**Request**:
```json
{
  "jsonrpc": "2.0",
  "method": "Reports.GetBalanceSheet",
  "params": {
    "auth": {"access_token": "...", "organization_id": "..."},
    "date": "2025-09-30",
    "periods": 1,
    "time_frame": "MONTH|QUARTER|YEAR"
  },
  "id": 4
}
```
**Response**:
```json
{
  "jsonrpc": "2.0",
  "result": {
    "report_name": "Balance Sheet",
    "report_date": "2025-09-30",
    "sections": [
      {
        "section_title": "Assets",
        "rows": [
          {
            "account_name": "Bank Account",
            "account_id": "acc_123",
            "balance": 15000.00
          }
        ]
      }
    ],
    "total_assets": 50000.00,
    "total_liabilities": 20000.00,
    "total_equity": 30000.00
  },
  "id": 4
}
```

### Reports.GetProfitAndLoss
**Purpose**: Generate profit and loss report  
**Request**:
```json
{
  "jsonrpc": "2.0",
  "method": "Reports.GetProfitAndLoss",
  "params": {
    "auth": {"access_token": "...", "organization_id": "..."},
    "from_date": "2025-07-01",
    "to_date": "2025-09-30",
    "time_frame": "MONTH|QUARTER|YEAR"
  },
  "id": 5
}
```

## HR/Payroll Module

### Employees.GetEmployees
**Purpose**: Retrieve employee list  
**Request**:
```json
{
  "jsonrpc": "2.0",
  "method": "Employees.GetEmployees",
  "params": {
    "auth": {"access_token": "...", "organization_id": "..."},
    "status": "active|inactive|all",
    "page": 1,
    "per_page": 50
  },
  "id": 6
}
```

### Payroll.CreatePayRun
**Purpose**: Create new payroll run  
**Request**:
```json
{
  "jsonrpc": "2.0",
  "method": "Payroll.CreatePayRun",
  "params": {
    "auth": {"access_token": "...", "organization_id": "..."},
    "pay_period_start": "2025-09-01",
    "pay_period_end": "2025-09-30",
    "payment_date": "2025-10-05",
    "employee_ids": ["emp_123", "emp_456"]
  },
  "id": 7
}
```

## Assets Module

### Assets.GetAssets
**Purpose**: Retrieve asset register  
**Request**:
```json
{
  "jsonrpc": "2.0",
  "method": "Assets.GetAssets",
  "params": {
    "auth": {"access_token": "...", "organization_id": "..."},
    "status": "registered|disposed|all",
    "asset_type": "optional_filter",
    "page": 1,
    "per_page": 25
  },
  "id": 8
}
```

## Error Responses

### Standard Error Format
```json
{
  "jsonrpc": "2.0",
  "error": {
    "code": -32000,
    "message": "Authentication failed",
    "data": {
      "error_type": "auth_error",
      "details": "OAuth2 token expired"
    }
  },
  "id": 1
}
```

### Common Error Codes
- `-32700`: Parse error (invalid JSON)
- `-32600`: Invalid request (missing required fields)
- `-32601`: Method not found (unknown MCP method)
- `-32602`: Invalid params (parameter validation failed)
- `-32603`: Internal error (MCP server error)
- `-32000`: Authentication error
- `-32001`: Authorization error (insufficient permissions)
- `-32002`: Rate limit exceeded
- `-32003`: Xero API error

## Contract Validation

### Request Validation Rules
- All requests must include valid JSON-RPC 2.0 structure
- Method names must follow `<Module>.<Action>` pattern
- Auth parameters required in all requests
- Parameter types must match specification
- Date parameters must use ISO 8601 format

### Response Guarantees
- All successful responses include `result` object
- All error responses include `error` object with code and message
- Request ID always matches response ID
- Numeric values use appropriate precision (2 decimal places for currency)

### Performance Contracts
- Simple queries (GetInvoices): < 1 second
- Complex reports (Balance Sheet): < 5 seconds
- Write operations (CreateInvoice): < 2 seconds
- Error responses: < 500ms

---

**Dependencies**:
- Xero MCP Server implementation
- Valid OAuth2 tokens for authentication
- Xero organization permissions for data access