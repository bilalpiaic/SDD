
# Implementation Plan: Xero MCP Wireframe Chatbot

**Branch**: `001-build-an-application` | **Date**: 2025-09-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-build-an-application/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → ✅ COMPLETE: Feature spec loaded successfully
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → ✅ COMPLETE: Web application structure, Python/TypeScript stack
   → ✅ COMPLETE: User-provided implementation details incorporated
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → ✅ COMPLETE: All constitutional requirements aligned
   → Update Progress Tracking: Initial Constitution Check ✅
5. Execute Phase 0 → research.md
   → ⏳ IN PROGRESS: Technology research and decision documentation
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file
7. Re-evaluate Constitution Check section
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 8. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
Build a conversational Xero accounting interface that allows users to perform CRUD operations and access all Xero modules (Accounting, Reports, HR, Payroll, Assets, Bank Feeds, Projects) through natural language commands. The system uses OAuth2 authentication, translates natural language to JSON-RPC MCP calls, and displays results as wireframe tiles/cards that can be reorganized via drag-and-drop. Technical approach: NextJS + TailwindCSS frontend, FastAPI + Agentic SDK backend, strict JSON-RPC protocol for all MCP communications, modular architecture supporting future extensibility.

## Technical Context
**Language/Version**: Python 3.11+ (backend), TypeScript/JavaScript (frontend)  
**Primary Dependencies**: FastAPI, OpenAI Agentic SDK, NextJS, TailwindCSS, Lucid React, Framer Motion  
**Storage**: Session storage for layout preferences, OAuth2 token management, no persistent database (Xero is source of truth)  
**Testing**: pytest (backend), Jest/Vitest (frontend), Playwright (E2E), JSON-RPC contract testing  
**Target Platform**: Web application - Linux/Docker containers (backend), Vercel/CDN (frontend)
**Project Type**: Web application with separated frontend and backend services  
**Performance Goals**: <2s natural language → JSON-RPC translation, <500ms UI updates, <200ms API responses  
**Constraints**: OAuth2 token lifecycle management, JSON-RPC 2.0 protocol compliance, wireframe-only UI styling  
**Scale/Scope**: Multi-tenant SaaS, concurrent user sessions, all Xero module coverage, extensible architecture

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**I. MCP-First Integration**: ✅ All Xero functionality accessed via Xero-MCP-Server only
**II. JSON-RPC Protocol**: ✅ All MCP requests use JSON-RPC 2.0 protocol exclusively  
**III. Wireframe-First UI**: ✅ Results displayed as tiles/cards/report blocks only
**IV. Modular Architecture**: ✅ Clear separation: Frontend/Backend/MCP layers with independent deployment
**V. Extensibility**: ✅ New MCP modules integrate without core system changes

**Technical Standards Check**:
- ✅ OAuth2 with Xero authentication
- ✅ Confirmation prompts for destructive operations  
- ✅ Stack: NextJS+TailwindCSS+Lucid React+FastAPI+Agentic SDK
- ✅ Natural language → JSON-RPC translation < 2s performance target

## Project Structure

### Documentation (this feature)
```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
# Xero MCP Wireframe Chatbot - Web Application Structure
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

**Structure Decision**: Web application with separate backend (FastAPI + MCP integration) and frontend (NextJS + wireframe UI) to support the chatbot architecture with clear separation between natural language processing, MCP protocol handling, and wireframe visualization.

## Phase 0: Outline & Research
✅ **COMPLETED**: Research document generated with technology decisions and architectural choices

**Research Results**:
- Backend: FastAPI + OpenAI Agentic SDK + Python 3.11+ for async performance
- Frontend: NextJS 14+ + TailwindCSS + Lucid React + Framer Motion for wireframe UI
- MCP Integration: JSON-RPC 2.0 client wrapper with response normalization
- NLP: OpenAI GPT integration with custom Xero domain prompts
- Authentication: OAuth2 Authorization Code Flow with PKCE
- Deployment: Microservices architecture with independent scaling

**Output**: [research.md](./research.md) ✅

## Phase 1: Design & Contracts
✅ **COMPLETED**: All design artifacts generated

**Generated Artifacts**:
1. **Data Model**: Core entities (User Session, Conversation, Wireframe Elements, Module Groups) with MCP integration models
2. **API Contracts**: 
   - Chatbot API: REST endpoints for natural language processing and dashboard management
   - MCP JSON-RPC: Standardized contract for all Xero module interactions
3. **Quickstart Guide**: Complete setup instructions for development and production deployment

**Design Validation**:
- All entities support wireframe UI requirements
- JSON-RPC contracts align with constitutional protocol requirements
- API design supports <2s performance targets
- Architecture enables future MCP module extensibility

**Output**: 
- [data-model.md](./data-model.md) ✅
- [contracts/chatbot-api.md](./contracts/chatbot-api.md) ✅  
- [contracts/mcp-jsonrpc.md](./contracts/mcp-jsonrpc.md) ✅
- [quickstart.md](./quickstart.md) ✅

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `.specify/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Each contract → contract test task [P]
- Each entity → model creation task [P] 
- Each user story → integration test task
- Implementation tasks to make tests pass

**Ordering Strategy**:
- TDD order: Tests before implementation 
- Dependency order: Models before services before UI
- Mark [P] for parallel execution (independent files)

**Estimated Output**: 25-30 numbered, ordered tasks in tasks.md

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command) ✅
- [x] Phase 1: Design complete (/plan command) ✅
- [x] Phase 2: Task planning complete (/plan command - describe approach only) ✅
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS ✅
- [x] Post-Design Constitution Check: PASS ✅ 
- [x] All NEEDS CLARIFICATION resolved ✅
- [x] Complexity deviations documented (None - all constitutional requirements met) ✅

**Final Constitution Validation**:
- ✅ **MCP-First Integration**: All design artifacts use Xero-MCP-Server exclusively
- ✅ **JSON-RPC Protocol**: All MCP contracts follow JSON-RPC 2.0 specification
- ✅ **Wireframe-First UI**: Data model supports tiles, cards, and report blocks only
- ✅ **Modular Architecture**: Clear separation maintained in all design documents
- ✅ **Extensibility**: MCP module pattern supports future additions without core changes

---
*Based on Constitution v1.0.0 - See `.specify/memory/constitution.md`*
