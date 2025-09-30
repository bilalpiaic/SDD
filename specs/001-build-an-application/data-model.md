# Data Model: Xero MCP Wireframe Chatbot

**Phase 1 Design Artifact**  
**Generated**: 2025-09-30  
**Based on**: Feature specification and research decisions

## Core Entities

### User Session
**Purpose**: Manages authenticated user state and conversation context  
**Attributes**:
- `session_id`: Unique identifier for user session
- `xero_organization_id`: Connected Xero organization
- `oauth_tokens`: Encrypted OAuth2 access/refresh tokens
- `layout_preferences`: Dashboard module arrangement
- `conversation_history`: Recent natural language interactions
- `permissions`: Xero-derived user access levels
- `created_at`: Session creation timestamp
- `expires_at`: Session expiration time

**Relationships**:
- One-to-many with Conversation entities
- One-to-one with Dashboard Layout

### Conversation
**Purpose**: Tracks individual natural language interactions and their outcomes  
**Attributes**:
- `conversation_id`: Unique identifier
- `session_id`: Reference to user session
- `user_input`: Original natural language command
- `interpreted_intent`: Classified intent and extracted parameters
- `mcp_request`: Generated JSON-RPC request
- `mcp_response`: Raw MCP server response
- `ui_response`: Normalized data for wireframe rendering
- `status`: Success, error, clarification_needed
- `timestamp`: Interaction time

**Relationships**:
- Many-to-one with User Session
- One-to-many with Wireframe Elements

### Wireframe Element
**Purpose**: Represents individual UI components rendered from MCP data  
**Attributes**:
- `element_id`: Unique identifier
- `element_type`: tile, card, report_block, module_group
- `data_source`: Source MCP module (invoices, reports, etc.)
- `display_data`: Processed data for UI rendering
- `metadata`: Styling hints, interaction capabilities
- `position`: Grid position for layout
- `conversation_id`: Source conversation reference

**Relationships**:
- Many-to-one with Conversation
- Many-to-one with Module Group

### Module Group
**Purpose**: Organizable containers for related wireframe elements  
**Attributes**:
- `group_id`: Unique identifier
- `group_name`: Display name (Invoices, Reports, etc.)
- `mcp_module`: Associated MCP module identifier
- `position`: Dashboard grid position
- `is_expanded`: Collapsed/expanded state
- `element_count`: Number of contained elements
- `last_updated`: Recent data refresh time

**Relationships**:
- One-to-many with Wireframe Elements
- Many-to-one with Dashboard Layout

### Dashboard Layout
**Purpose**: Persists user-customized arrangement of module groups  
**Attributes**:
- `layout_id`: Unique identifier
- `session_id`: Reference to user session
- `grid_configuration`: Module group positions and sizes
- `preferences`: Display settings, themes
- `is_default`: Whether this is the user's default layout
- `last_modified`: Recent layout change timestamp

**Relationships**:
- One-to-one with User Session
- One-to-many with Module Groups

## MCP Integration Models

### MCP Request
**Purpose**: Standardized JSON-RPC request structure for MCP communication  
**Attributes**:
- `jsonrpc`: Protocol version (always "2.0")
- `method`: MCP module method (e.g., "Invoices.GetInvoices")
- `params`: Request parameters object
- `id`: Unique request identifier
- `auth_context`: OAuth2 tokens and organization context

### MCP Response
**Purpose**: Standardized JSON-RPC response structure from MCP server  
**Attributes**:
- `jsonrpc`: Protocol version (always "2.0")
- `result`: Success response data
- `error`: Error object if request failed
- `id`: Matching request identifier

### Xero Data Entities (MCP-sourced)
**Purpose**: Represents Xero business objects accessed via MCP  

#### Invoice Entity
- `invoice_id`: Xero invoice identifier
- `contact_name`: Customer/supplier name
- `amount_due`: Outstanding amount
- `due_date`: Payment due date
- `status`: Paid, pending, overdue
- `line_items`: Invoice line detail

#### Contact Entity
- `contact_id`: Xero contact identifier
- `name`: Contact name
- `email`: Primary email address
- `contact_type`: Customer, supplier
- `balance`: Outstanding balance

#### Account Entity
- `account_id`: Xero account identifier
- `account_name`: Account display name
- `account_type`: Asset, liability, equity, revenue, expense
- `balance`: Current account balance

#### Transaction Entity
- `transaction_id`: Xero transaction identifier
- `account_id`: Associated account
- `amount`: Transaction amount
- `date`: Transaction date
- `description`: Transaction description
- `reconciliation_status`: Reconciled, pending

#### Report Entity
- `report_type`: balance_sheet, profit_loss, aged_receivables, etc.
- `period`: Reporting period
- `data`: Report data structure
- `generated_at`: Report generation timestamp

## Validation Rules

### Input Validation
- Natural language input: Max 500 characters, XSS prevention
- OAuth2 tokens: Format validation, expiry checking
- Layout preferences: JSON schema validation
- MCP parameters: Type checking against MCP specifications

### Business Rules
- Session timeout: 4 hours of inactivity
- Conversation history: Max 50 interactions per session
- Dashboard elements: Max 100 elements per layout
- MCP request rate limiting: 10 requests per second per user

### Data Constraints
- All monetary amounts: Decimal precision (2 places)
- Dates: ISO 8601 format
- Organization scope: All data filtered by Xero organization
- Permission enforcement: Read/write access based on Xero user roles

## State Transitions

### Session States
1. **Unauthenticated** → OAuth2 redirect → **Authenticating** 
2. **Authenticating** → Token exchange → **Active**
3. **Active** → Timeout/logout → **Expired**
4. **Active** → Token refresh → **Active**

### Conversation States
1. **Processing** → Intent classification → **Interpreted**
2. **Interpreted** → MCP request → **Executing** 
3. **Executing** → MCP response → **Completed**
4. **Executing** → MCP error → **Error**
5. **Interpreted** → Ambiguous intent → **Clarification_Required**

### Element States
1. **Loading** → Data received → **Rendered**
2. **Rendered** → User interaction → **Updated**
3. **Rendered** → Data refresh → **Loading**
4. **Error** → Retry → **Loading**

---

## Model Summary

This data model supports the core requirements:
- **Conversational Interface**: User sessions with natural language interaction tracking
- **MCP Integration**: Standardized JSON-RPC request/response handling
- **Wireframe UI**: Flexible element system for tiles, cards, and reports
- **Drag-and-Drop**: Layout persistence with module group organization
- **Authentication**: OAuth2 token management and session security
- **Extensibility**: Generic MCP module pattern for future additions

**Dependencies**: Requires MCP server API specifications for complete parameter validation