# Tasks: Xero MCP Wireframe Chatbot

**Input**: Design documents from `/specs/001-build-an-application/`
**Prerequisites**: plan.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → ✅ COMPLETE: Tech stack extracted (FastAPI + Agentic SDK + NextJS + TailwindCSS)
2. Load optional design documents:
   → data-model.md: ✅ Entities extracted (User Session, Conversation, Wireframe Element, Module Group, Dashboard Layout)
   → contracts/: ✅ Contract tests generated (chatbot-api.md, mcp-jsonrpc.md)
   → research.md: ✅ Setup decisions extracted (OAuth2, JSON-RPC, NLP integration)
3. Generate tasks by category:
   → Setup: ✅ Project structure, dependencies, environment
   → Tests: ✅ Contract tests, integration tests (TDD)
   → Core: ✅ Models, services, UI components
   → Integration: ✅ API wiring, MCP connections
   → Polish: ✅ Performance, documentation, compliance
4. Apply task rules:
   → ✅ Different files marked [P] for parallel execution
   → ✅ Same file tasks sequential (no [P])
   → ✅ Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → ✅ All contracts have tests
   → ✅ All entities have models
   → ✅ All endpoints implemented
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Web app**: `backend/src/`, `frontend/src/` (as per plan.md structure)
- Backend: Python + FastAPI + Agentic SDK
- Frontend: NextJS + TypeScript + TailwindCSS + Lucid React + Framer Motion

## Phase 3.1: Setup
- [ ] T001 Create backend project structure with UV environment in backend/
- [ ] T002 Create frontend project structure with NextJS + TypeScript in frontend/
- [ ] T003 [P] Configure backend dependencies (FastAPI, Agentic SDK, pytest) in backend/pyproject.toml
- [ ] T004 [P] Configure frontend dependencies (NextJS, TailwindCSS, Lucid React, Framer Motion) in frontend/package.json
- [ ] T005 [P] Setup backend linting and formatting (black, flake8, mypy) in backend/
- [ ] T006 [P] Setup frontend linting and formatting (ESLint, Prettier) in frontend/
- [ ] T007 Configure environment variables and secrets management for both projects

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

### Contract Tests
- [ ] T008 [P] JSON-RPC MCP contract test for authentication endpoints in backend/tests/contract/test_mcp_auth.py
- [ ] T009 [P] JSON-RPC MCP contract test for Invoices module in backend/tests/contract/test_mcp_invoices.py
- [ ] T010 [P] JSON-RPC MCP contract test for Reports module in backend/tests/contract/test_mcp_reports.py
- [ ] T011 [P] JSON-RPC MCP contract test for HR/Payroll module in backend/tests/contract/test_mcp_hr_payroll.py
- [ ] T012 [P] JSON-RPC MCP contract test for Assets module in backend/tests/contract/test_mcp_assets.py
- [ ] T013 [P] JSON-RPC MCP contract test for Bank Feeds module in backend/tests/contract/test_mcp_bankfeeds.py
- [ ] T014 [P] JSON-RPC MCP contract test for Projects module in backend/tests/contract/test_mcp_projects.py

### API Contract Tests
- [ ] T015 [P] Chatbot API contract test for POST /auth/oauth/initiate in backend/tests/contract/test_api_auth.py
- [ ] T016 [P] Chatbot API contract test for POST /chat/message in backend/tests/contract/test_api_chat.py
- [ ] T017 [P] Chatbot API contract test for GET /chat/history in backend/tests/contract/test_api_history.py
- [ ] T018 [P] Chatbot API contract test for dashboard endpoints in backend/tests/contract/test_api_dashboard.py

### Integration Tests
- [ ] T019 [P] Integration test for OAuth2 Xero authentication flow in backend/tests/integration/test_xero_auth_flow.py
- [ ] T020 [P] Integration test for natural language → JSON-RPC translation in backend/tests/integration/test_nlp_to_jsonrpc.py
- [ ] T021 [P] Integration test for end-to-end conversation flow in backend/tests/integration/test_conversation_flow.py
- [ ] T022 [P] Integration test for dashboard layout persistence in backend/tests/integration/test_dashboard_persistence.py

### Frontend Component Tests
- [ ] T023 [P] Wireframe tile component tests in frontend/tests/components/test_wireframe_tile.test.tsx
- [ ] T024 [P] Wireframe card component tests in frontend/tests/components/test_wireframe_card.test.tsx
- [ ] T025 [P] Wireframe report block component tests in frontend/tests/components/test_report_block.test.tsx
- [ ] T026 [P] Drag-and-drop dashboard component tests in frontend/tests/components/test_drag_drop_dashboard.test.tsx
- [ ] T027 [P] Chat interface component tests in frontend/tests/components/test_chat_interface.test.tsx

## Phase 3.3: Core Implementation (ONLY after tests are failing)

### Backend Models
- [ ] T028 [P] User Session model in backend/src/models/user_session.py
- [ ] T029 [P] Conversation model in backend/src/models/conversation.py
- [ ] T030 [P] Wireframe Element model in backend/src/models/wireframe_element.py
- [ ] T031 [P] Module Group model in backend/src/models/module_group.py
- [ ] T032 [P] Dashboard Layout model in backend/src/models/dashboard_layout.py
- [ ] T033 [P] MCP Request/Response models in backend/src/models/mcp_models.py

### Backend Services
- [ ] T034 [P] OAuth2 Xero authentication service in backend/src/auth/xero_oauth.py
- [ ] T035 [P] JSON-RPC MCP client wrapper in backend/src/mcp/jsonrpc_client.py
- [ ] T036 [P] Natural language processing service in backend/src/services/nlp_service.py
- [ ] T037 [P] Session management service in backend/src/services/session_service.py
- [ ] T038 [P] Conversation service in backend/src/services/conversation_service.py
- [ ] T039 [P] Dashboard layout service in backend/src/services/dashboard_service.py

### MCP Module Services
- [ ] T040 [P] Invoices MCP service in backend/src/services/mcp/invoices_service.py
- [ ] T041 [P] Contacts MCP service in backend/src/services/mcp/contacts_service.py
- [ ] T042 [P] Accounts MCP service in backend/src/services/mcp/accounts_service.py
- [ ] T043 [P] Transactions MCP service in backend/src/services/mcp/transactions_service.py
- [ ] T044 [P] Reports MCP service in backend/src/services/mcp/reports_service.py
- [ ] T045 [P] HR/Payroll MCP service in backend/src/services/mcp/hr_payroll_service.py
- [ ] T046 [P] Assets MCP service in backend/src/services/mcp/assets_service.py
- [ ] T047 [P] Bank Feeds MCP service in backend/src/services/mcp/bankfeeds_service.py
- [ ] T048 [P] Projects MCP service in backend/src/services/mcp/projects_service.py

### Backend API Endpoints
- [ ] T049 Authentication API endpoints in backend/src/api/auth.py
- [ ] T050 Chat/conversation API endpoints in backend/src/api/chat.py
- [ ] T051 Dashboard API endpoints in backend/src/api/dashboard.py
- [ ] T052 Health check and status API endpoints in backend/src/api/health.py

### Frontend Core Components
- [ ] T053 [P] Wireframe Tile component in frontend/src/components/wireframe/WireframeTile.tsx
- [ ] T054 [P] Wireframe Card component in frontend/src/components/wireframe/WireframeCard.tsx
- [ ] T055 [P] Wireframe Report Block component in frontend/src/components/wireframe/ReportBlock.tsx
- [ ] T056 [P] Module Group container component in frontend/src/components/wireframe/ModuleGroup.tsx
- [ ] T057 [P] Drag-and-drop dashboard component in frontend/src/components/dashboard/DragDropDashboard.tsx

### Frontend Chat Interface
- [ ] T058 [P] Chat input component with natural language processing in frontend/src/components/chat/ChatInput.tsx
- [ ] T059 [P] Chat message display component in frontend/src/components/chat/ChatMessage.tsx
- [ ] T060 [P] Chat history component in frontend/src/components/chat/ChatHistory.tsx
- [ ] T061 [P] Confirmation prompt component for destructive actions in frontend/src/components/chat/ConfirmationPrompt.tsx

### Frontend Pages and Layout
- [ ] T062 [P] Main dashboard page in frontend/src/pages/dashboard.tsx
- [ ] T063 [P] OAuth2 callback page in frontend/src/pages/auth/callback.tsx
- [ ] T064 [P] Login/landing page in frontend/src/pages/index.tsx
- [ ] T065 [P] Main layout component with navigation in frontend/src/components/layout/MainLayout.tsx

### Frontend Services and Utilities
- [ ] T066 [P] API service for backend communication in frontend/src/services/api.ts
- [ ] T067 [P] Authentication service for token management in frontend/src/services/auth.ts
- [ ] T068 [P] Drag-and-drop utilities in frontend/src/utils/dragDrop.ts
- [ ] T069 [P] Animation utilities with Framer Motion in frontend/src/utils/animations.ts
- [ ] T070 [P] TypeScript type definitions for MCP responses in frontend/src/types/mcp.ts

## Phase 3.4: Integration
- [ ] T071 Connect OAuth2 service with MCP client authentication
- [ ] T072 Integrate natural language service with MCP module services
- [ ] T073 Wire all MCP services to JSON-RPC client
- [ ] T074 Connect frontend chat interface to backend API endpoints
- [ ] T075 Integrate dashboard layout persistence with backend
- [ ] T076 Connect wireframe components to real MCP data
- [ ] T077 Implement error handling for MCP failures and timeouts
- [ ] T078 Add confirmation prompts for destructive operations (delete, payroll runs)
- [ ] T079 Implement session timeout and token refresh mechanisms
- [ ] T080 Add loading states and skeleton UI for async operations

## Phase 3.5: Polish
- [ ] T081 [P] Unit tests for all backend services in backend/tests/unit/
- [ ] T082 [P] Unit tests for all frontend components in frontend/tests/unit/
- [ ] T083 [P] Performance tests for natural language processing (<2s) in backend/tests/performance/test_nlp_performance.py
- [ ] T084 [P] Performance tests for UI responsiveness (<500ms) in frontend/tests/performance/test_ui_performance.test.ts
- [ ] T085 [P] Visual regression tests for wireframe components in frontend/tests/visual/test_wireframe_visual.test.ts
- [ ] T086 [P] End-to-end tests for complete user workflows in tests/e2e/test_user_workflows.spec.ts
- [ ] T087 [P] Update README with setup and usage instructions
- [ ] T088 [P] Create API documentation from contract specifications
- [ ] T089 [P] Add deployment configuration (Docker, Vercel)
- [ ] T090 Constitution compliance validation and security audit

## Dependencies

### Critical Path Dependencies
1. **Setup Phase**: T001-T007 must complete before any other work
2. **TDD Gate**: T008-T027 (all tests) must complete and FAIL before T028+ implementation
3. **Model Dependencies**: T028-T033 (models) before T034-T048 (services)
4. **Service Dependencies**: T034-T048 (services) before T049-T052 (API endpoints)
5. **Frontend Dependencies**: T053-T065 (components/pages) before T071-T080 (integration)
6. **Integration Gate**: T071-T080 (integration) before T081-T090 (polish)

### Parallel Execution Groups
- **Setup**: T003, T004 can run parallel (different projects)
- **Contract Tests**: T008-T018 can run parallel (different test files)
- **Integration Tests**: T019-T022 can run parallel (different test files)
- **Frontend Component Tests**: T023-T027 can run parallel (different test files)
- **Backend Models**: T028-T033 can run parallel (different model files)
- **Backend Services**: T034-T039 can run parallel (different service files)
- **MCP Services**: T040-T048 can run parallel (different MCP modules)
- **Frontend Components**: T053-T061 can run parallel (different component files)
- **Polish Tasks**: T081-T089 can run parallel (different areas)

## Parallel Execution Examples

### Setup Phase Parallel Execution
```bash
# Launch backend and frontend setup together:
Task: "Configure backend dependencies (FastAPI, Agentic SDK, pytest) in backend/pyproject.toml"
Task: "Configure frontend dependencies (NextJS, TailwindCSS, Lucid React, Framer Motion) in frontend/package.json"
Task: "Setup backend linting and formatting (black, flake8, mypy) in backend/"
Task: "Setup frontend linting and formatting (ESLint, Prettier) in frontend/"
```

### Contract Tests Parallel Execution
```bash
# Launch all MCP contract tests together:
Task: "JSON-RPC MCP contract test for Invoices module in backend/tests/contract/test_mcp_invoices.py"
Task: "JSON-RPC MCP contract test for Reports module in backend/tests/contract/test_mcp_reports.py"
Task: "JSON-RPC MCP contract test for HR/Payroll module in backend/tests/contract/test_mcp_hr_payroll.py"
Task: "JSON-RPC MCP contract test for Assets module in backend/tests/contract/test_mcp_assets.py"
```

### MCP Services Parallel Execution
```bash
# Launch all MCP service implementations together:
Task: "Invoices MCP service in backend/src/services/mcp/invoices_service.py"
Task: "Reports MCP service in backend/src/services/mcp/reports_service.py"
Task: "HR/Payroll MCP service in backend/src/services/mcp/hr_payroll_service.py"
Task: "Assets MCP service in backend/src/services/mcp/assets_service.py"
```

## Validation Checklist
- [ ] All contract files have corresponding test tasks
- [ ] All entities have model creation tasks
- [ ] All API endpoints have implementation tasks
- [ ] All wireframe components have test and implementation tasks
- [ ] All MCP modules have service implementation tasks
- [ ] TDD principle maintained (tests before implementation)
- [ ] Constitutional requirements addressed (OAuth2, JSON-RPC, wireframe UI, modularity)
- [ ] Performance targets included in polish phase (<2s NLP, <500ms UI)
- [ ] Error handling and confirmation prompts included
- [ ] Documentation and deployment tasks included

## Notes
- **[P] tasks**: Different files, can run in parallel
- **Sequential tasks**: Same file or dependent functionality
- **TDD Critical**: Verify all tests fail before implementing features
- **Performance**: Monitor natural language processing <2s requirement
- **Security**: OAuth2 token handling and session management critical
- **Constitutional**: Maintain JSON-RPC protocol and wireframe-only UI principles
- **Extensibility**: MCP module pattern supports future Xero module additions

---

**Ready for execution**: All 90 tasks defined with clear dependencies and parallel execution guidance. Execute in phase order: Setup → Tests → Implementation → Integration → Polish.