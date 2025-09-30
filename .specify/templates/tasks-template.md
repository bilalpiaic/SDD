# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 3.1: Setup
- [ ] T001 Create project structure per implementation plan
- [ ] T002 Initialize [language] project with [framework] dependencies
- [ ] T003 [P] Configure linting and formatting tools

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T004 [P] JSON-RPC MCP contract test for Invoices module in tests/contract/test_mcp_invoices.py
- [ ] T005 [P] JSON-RPC MCP contract test for Reports module in tests/contract/test_mcp_reports.py
- [ ] T006 [P] Integration test for natural language → JSON-RPC translation in tests/integration/test_nlp_to_jsonrpc.py
- [ ] T007 [P] Integration test for OAuth2 Xero authentication flow in tests/integration/test_xero_auth.py
- [ ] T008 [P] Wireframe UI component tests for tiles/cards in tests/visual/test_wireframe_components.py

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] T009 [P] MCP JSON-RPC client integration in backend/src/mcp/jsonrpc_client.py
- [ ] T010 [P] Xero OAuth2 authentication service in backend/src/auth/xero_oauth.py
- [ ] T011 [P] Natural language processing service in backend/src/services/nlp_service.py
- [ ] T012 [P] Wireframe tile component in frontend/src/components/WireframeTile.tsx
- [ ] T013 [P] Wireframe card component in frontend/src/components/WireframeCard.tsx
- [ ] T014 FastAPI chatbot API endpoints in backend/src/api/chatbot.py
- [ ] T015 MCP module services (Invoices, Reports, etc.) in backend/src/services/mcp_modules.py
- [ ] T016 Drag-and-drop module reordering in frontend/src/components/DragDropDashboard.tsx

## Phase 3.4: Integration
- [ ] T017 Connect MCP services to JSON-RPC client
- [ ] T018 Integrate OAuth2 with MCP requests
- [ ] T019 Wire chatbot UI to backend API
- [ ] T020 Implement confirmation prompts for destructive operations
- [ ] T021 Error handling for MCP failures and JSON-RPC errors

## Phase 3.5: Polish
- [ ] T022 [P] Unit tests for JSON-RPC protocol handling in tests/unit/test_jsonrpc.py
- [ ] T023 [P] Performance tests for natural language processing (<2s) in tests/performance/test_nlp_speed.py
- [ ] T024 [P] Visual regression tests for wireframe components in tests/visual/test_wireframe_regression.py
- [ ] T025 [P] Update documentation for MCP integration patterns
- [ ] T026 Constitution compliance validation and cleanup

## Dependencies
- Tests (T004-T007) before implementation (T008-T014)
- T008 blocks T009, T015
- T016 blocks T018
- Implementation before polish (T019-T023)

## Parallel Example
```
# Launch T004-T007 together:
Task: "Contract test POST /api/users in tests/contract/test_users_post.py"
Task: "Contract test GET /api/users/{id} in tests/contract/test_users_get.py"
Task: "Integration test registration in tests/integration/test_registration.py"
Task: "Integration test auth in tests/integration/test_auth.py"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Each contract file → contract test task [P]
   - Each endpoint → implementation task
   
2. **From Data Model**:
   - Each entity → model creation task [P]
   - Relationships → service layer tasks
   
3. **From User Stories**:
   - Each story → integration test [P]
   - Quickstart scenarios → validation tasks

4. **Ordering**:
   - Setup → Tests → Models → Services → Endpoints → Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [ ] All contracts have corresponding tests
- [ ] All entities have model tasks
- [ ] All tests come before implementation
- [ ] Parallel tasks truly independent
- [ ] Each task specifies exact file path
- [ ] No task modifies same file as another [P] task