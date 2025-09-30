<!--
Sync Impact Report:
- Version change: Initial → 1.0.0
- New constitution for Xero MCP Wireframe Chatbot project
- Added sections: Core Principles (MCP-First, JSON-RPC Protocol, Wireframe UI, Modular Architecture, Extensibility), Technical Standards, Development Workflow
- Templates requiring updates: ✅ updated constitution.md
- Follow-up TODOs: None
-->

# Xero MCP Wireframe Chatbot Constitution

## Core Principles

### I. MCP-First Integration
All Xero functionality MUST be accessed exclusively through the Xero-MCP-Server using standardized MCP protocols. Direct API calls to Xero are prohibited. Every feature must leverage MCP tools for consistency, maintainability, and future extensibility across all supported modules (Accounting, Reports, HR, Payroll, Assets, Bank Feeds, Projects).

### II. JSON-RPC Protocol (NON-NEGOTIABLE)
All MCP requests and responses MUST use JSON-RPC 2.0 protocol for standardized communication. This ensures consistent request/response handling, error management, and debugging capabilities. No direct HTTP calls or proprietary protocols are permitted for MCP interactions.

### III. Wireframe-First UI Design
The user interface MUST prioritize wireframe-style visual elements including tiles, cards, and report blocks for displaying data. All results from MCP operations must be rendered as wireframe previews that are scannable, reorganizable, and provide clear visual hierarchy without complex graphics or detailed styling.

### IV. Modular Architecture
The application MUST maintain clear separation between frontend (NextJS + TailwindCSS + Lucid React), backend (FastAPI + Agentic SDK), and MCP integration layers. Each module (Invoices, Reports, Payroll, etc.) must be independently testable and deployable. Natural language processing must be decoupled from MCP request execution.

### V. Extensibility and Future-Proofing
The architecture MUST support easy integration of new MCP modules as they are released without requiring core system changes. All module integrations must follow the same JSON-RPC pattern, and the UI must accommodate new module types through the existing tile/card framework.

## Technical Standards

### Authentication and Security
- OAuth2 integration with Xero is mandatory for all user sessions
- Confirmation prompts required before any destructive operations (delete, update critical data)
- HR/Payroll data access requires additional role-based validation
- All JSON-RPC requests must include proper authentication tokens

### Performance and User Experience
- Natural language commands must be translated to JSON-RPC calls within 2 seconds
- Drag-and-drop module reordering must provide immediate visual feedback
- Error states must be clearly communicated through wireframe UI elements
- All MCP responses must be normalized for consistent UI rendering

### Stack Requirements
- Frontend: NextJS + TailwindCSS + Lucid React + Framer Motion
- Backend: Python + UV Environment + FastAPI + OpenAI Agentic SDK
- Protocol: JSON-RPC 2.0 for all MCP communications
- Deployment: Frontend on Vercel, Backend containerized on cloud platform

## Development Workflow

### Test-Driven Development
- JSON-RPC integration tests must be written before MCP module implementation
- UI wireframe components must have visual regression tests
- Natural language parsing must include comprehensive input validation tests
- All CRUD operations require both unit and integration test coverage

### Code Review and Quality Gates
- All PRs must demonstrate compliance with JSON-RPC protocol standards
- UI changes require wireframe design consistency validation
- MCP integrations must include error handling and fallback scenarios
- Performance impact assessment required for new modules or features

## Governance

This constitution supersedes all other development practices and decisions. Any deviation requires explicit justification and documentation of alternative approach. All feature implementations must verify compliance with these principles before deployment.

Amendments to this constitution require approval from project stakeholders and must include migration plan for existing features. Version changes follow semantic versioning: MAJOR for principle changes, MINOR for new sections, PATCH for clarifications.

Use `.specify/templates/agent-file-template.md` for runtime development guidance and technology-specific commands.

**Version**: 1.0.0 | **Ratified**: 2025-09-30 | **Last Amended**: 2025-09-30