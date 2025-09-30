# Xero MCP Wireframe Chatbot Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-09-30

## Active Technologies
- **Backend**: Python + UV Environment + FastAPI + OpenAI Agentic SDK
- **Frontend**: NextJS + TailwindCSS + Lucid React + Framer Motion
- **Protocol**: JSON-RPC 2.0 for all MCP communications
- **Authentication**: OAuth2 with Xero
- **Integration**: Xero-MCP-Server (all modules: Accounting, Reports, HR, Payroll, Assets, Bank Feeds, Projects)

## Project Structure
```
backend/
├── src/
│   ├── models/          # MCP response models, user session models
│   ├── services/        # MCP integration services, NLP processing
│   ├── api/            # FastAPI endpoints for chatbot communication
│   ├── mcp/            # JSON-RPC MCP client integration
│   └── auth/           # OAuth2 Xero authentication
└── tests/
    ├── contract/       # JSON-RPC MCP contract tests
    ├── integration/    # End-to-end chatbot flow tests
    └── unit/          # Service and model unit tests

frontend/
├── src/
│   ├── components/     # Wireframe UI components (tiles, cards, blocks)
│   ├── pages/         # Chat interface and dashboard pages
│   ├── services/      # API communication with backend
│   ├── types/         # TypeScript definitions for MCP responses
│   └── utils/         # Drag-and-drop, animation utilities
└── tests/
    ├── visual/        # Wireframe component regression tests
    ├── interaction/   # Drag-and-drop and animation tests
    └── unit/         # Component unit tests
```

## Commands
### Backend Development
- `uv init` - Initialize Python project with UV environment
- `uv add fastapi agentic-sdk` - Add core backend dependencies
- `uv run pytest tests/` - Run all tests
- `uv run python -m src.api.main` - Start FastAPI development server

### Frontend Development
- `npx create-next-app@latest --typescript --tailwind` - Initialize NextJS project
- `npm install lucide-react framer-motion` - Add UI and animation libraries
- `npm run dev` - Start development server
- `npm run test` - Run component tests

### MCP Integration
- All MCP requests MUST use JSON-RPC 2.0 format:
  ```json
  {
    "jsonrpc": "2.0",
    "method": "ModuleName.ActionName",
    "params": { "key": "value" },
    "id": 1
  }
  ```

## Code Style
### Python (Backend)
- Use FastAPI async/await patterns for all endpoints
- Pydantic models for request/response validation
- Type hints required for all function signatures
- JSON-RPC client wrapper for all MCP communications

### TypeScript/React (Frontend)
- Functional components with hooks
- TailwindCSS for all styling (wireframe-focused classes)
- Lucide React for consistent icon usage
- Framer Motion for conversational animations only

## Recent Changes
1. **Constitution v1.0.0**: Established MCP-first, JSON-RPC, wireframe UI principles
2. **Project Structure**: Defined backend/frontend separation with MCP integration layer
3. **Template Updates**: Aligned plan, tasks, and agent templates with constitution requirements

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->