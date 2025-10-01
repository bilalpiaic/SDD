# 📦 Xero-MCP Wireframe Chatbot – Prompt Pack

This document contains the **structured prompts** for building and testing the **Xero MCP CRUD + Full Tools Wireframe Chatbot App**.
Stack: **Python, UV Environment, OpenAI Agentic SDK, FastAPI, NextJS, Lucid React, TailwindCSS.**
All **MCP tool calls must use JSON-RPC** for standardized request/response handling.

---

## 1. Constitution

```
/constitution  
The application is a wireframe-style chatbot that integrates with Xero via the Xero-MCP-Server.  
It enables users to perform CRUD operations and access all MCP-supported modules (Accounting, Reports, HR, Payroll, Assets, Bank Feeds, Projects, etc.) using natural language commands.  
The chatbot interprets input, translates into JSON-RPC calls via Agentic SDK, executes MCP API requests, and displays results as wireframe previews (tiles, cards, or report blocks).  
Users can reorder module groups (Invoices, Reports, Payroll, etc.) with drag-and-drop on the main screen.  
```

---

## 2. Specify

```
/specify  
Build an application that allows users to:  
- Authenticate with Xero via OAuth2.  
- Interact via a wireframe-style chatbot UI.  
- Perform CRUD operations on Invoices, Contacts, Accounts, Transactions.  
- Use all additional Xero MCP tools: Reports, HR, Payroll, Assets, Bank Feeds, Projects.  
- See results as wireframe tiles/cards/report blocks.  
- Reorganize modules on a drag-and-drop dashboard.  
- Execute MCP requests strictly via JSON-RPC protocol for consistent tooling.  
- Receive confirmation prompts before destructive actions.  
- Extend easily as new MCP modules are released.  
```

---

## 3. Plan

```
/plan  
1. Setup OAuth2 with Xero.  
2. Build frontend chatbot UI with NextJS + TailwindCSS + Lucid React.  
3. Implement NLP-to-MCP translator with FastAPI + Agentic SDK.  
4. Use JSON-RPC for all MCP requests/responses.  
5. Map CRUD + extended module commands to MCP JSON-RPC API.  
6. Display results as wireframe tiles/cards/reports in chatbot.  
7. Add drag-and-drop dashboard to reorder module groups.  
8. Implement error handling and confirmations.  
9. Keep backend modular to allow future MCP tools.  
```

---

## 4. Tasks

```
/tasks  
- Integrate Xero OAuth2 login.  
- Build chatbot wireframe UI (NextJS + TailwindCSS + Lucid React).  
- Add conversational animations (Framer Motion).  
- Implement FastAPI backend with Agentic SDK + JSON-RPC tooling.  
- Create NLP parser for mapping chat → MCP JSON-RPC requests.  
- Implement CRUD for Invoices, Contacts, Accounts, Transactions.  
- Implement additional modules via JSON-RPC:  
  • Reports (Balance Sheet, P&L, Aged Payables/Receivables, Tax).  
  • HR/Payroll (Employees, Leave, Pay Runs).  
  • Assets (Register, Update, View assets).  
  • Bank Feeds (Reconciliation, Transactions).  
  • Projects (Create, Log expenses, Update status).  
- Render responses as wireframe previews (tiles, cards, report blocks).  
- Build drag-and-drop dashboard reordering.  
- Add error handling and confirmation prompts.  
```

---

## 5. Implementation

```
/implementation  
Frontend:  
- NextJS + TailwindCSS + Lucid React for chatbot UI.  
- Wireframe-style tiles/cards for results.  
- Framer Motion for conversational animations.  
- Drag-and-drop for module reordering.  

Backend:  
- FastAPI with OpenAI Agentic SDK.  
- All MCP requests executed via JSON-RPC calls.  
- NLP interpreter → JSON-RPC MCP request builder.  
- Response normalizer → JSON for UI.  

Integration:  
- Xero-MCP-Server (CRUD + Reports + HR/Payroll + Assets + Projects + Bank Feeds).  
- OAuth2 authentication with Xero.  

Deployment:  
- Frontend → Vercel.  
- Backend → Render/Heroku/AWS (Dockerized).  
```

---

## 6. Clarify

```
/clarify  
- Which MCP tools should be prioritized for MVP (Invoices, Reports, Payroll, etc.)?  
- Should chatbot responses include export options (PDF/CSV/Excel)?  
- Do users require role-based access (e.g., Payroll restricted to HR roles)?  
- Should reports be interactive (expandable drill-down) or static summaries?  
- Is the dashboard drag-and-drop meant to persist per-user (saved layouts) or temporary views?  
- Should JSON-RPC responses be logged for debugging or anonymized for security?  
- What is the expected concurrency (number of active sessions)?  
```

---

## 7. Analyse

```
/analyse  
Strengths:  
- Natural language interface simplifies Xero usage.  
- JSON-RPC standardizes all MCP interactions.  
- MCP ensures consistent integration across modules.  
- Wireframe tiles make data easy to preview and reorganize.  

Weaknesses:  
- JSON-RPC adds serialization overhead.  
- NLP misinterpretation risk → needs fallback clarification.  
- Reports may become complex to render in minimal wireframe UI.  
- HR/Payroll data adds sensitivity and requires strong RBAC.  

Opportunities:  
- JSON-RPC tooling makes integration extensible and auditable.  
- Extensible for future Xero MCP tools.  
- Can be adapted into mobile or Slack/Teams chat apps.  
- Bulk actions and analytics dashboards add enterprise value.  

Threats:  
- Dependency on MCP availability and stability.  
- OAuth2 token handling security risks.  
- Performance bottlenecks if report queries are large.  
```

---

## 8. Train

```
/train  
Provide sample chatbot commands and their mapped MCP JSON-RPC modules & actions.  

Example JSON-RPC request structure:  
{  
  "jsonrpc": "2.0",  
  "method": "Invoices.CreateInvoice",  
  "params": { "contact": "ABC Ltd", "amount": 500, "dueDate": "2025-10-06" },  
  "id": 1  
}  

1. Accounting (CRUD)  
- "Create a new invoice for ABC Ltd, $500 due next week." → Invoices → CreateInvoice (JSON-RPC call)  
- "Update invoice #1023 status to Paid." → Invoices → UpdateInvoice (JSON-RPC call)  
- "Show me all unpaid invoices." → Invoices → GetInvoices (JSON-RPC call)  
- "Add new contact John Doe, email john@abc.com." → Contacts → CreateContact (JSON-RPC call)  
- "List all bank accounts." → Accounts → GetAccounts (JSON-RPC call)  
- "Record a payment of $200 for invoice #1045." → Transactions → CreateTransaction (JSON-RPC call)  

2. Reports  
- "Run Balance Sheet for Q2 2025." → Reports → GetBalanceSheetReport (JSON-RPC call)  
- "Show Profit & Loss for last month." → Reports → GetProfitAndLossReport (JSON-RPC call)  
- "List overdue bills." → Reports → GetAgedPayablesReport (JSON-RPC call)  
- "Generate tax report for FY2024." → Reports → GetTaxReport (JSON-RPC call)  

3. HR & Payroll  
- "Add a new employee Jane Smith, start date Oct 1." → Employees → CreateEmployee (JSON-RPC call)  
- "Update John Doe’s job title to Senior Developer." → Employees → UpdateEmployee (JSON-RPC call)  
- "Apply annual leave for Jane from Oct 5 to Oct 10." → Leave → CreateLeaveRequest (JSON-RPC call)  
- "Run payroll for September 30." → Payroll → CreatePayRun (JSON-RPC call)  
- "Show last 3 pay runs." → Payroll → GetPayRuns (JSON-RPC call)  

4. Assets  
- "Register new laptop asset, $1200, purchased Sept 20." → Assets → CreateAsset (JSON-RPC call)  
- "Show all depreciating assets." → Assets → GetAssets (JSON-RPC call)  
- "Update asset #300 depreciation schedule." → Assets → UpdateAsset (JSON-RPC call)  

5. Bank Feeds  
- "Show bank transactions for last 7 days." → Bank Feeds → GetBankTransactions (JSON-RPC call)  
- "Reconcile account 090-123 0012345." → Bank Feeds → ReconcileBankAccount (JSON-RPC call)  
- "List all unreconciled transactions." → Bank Feeds → GetUnreconciledTransactions (JSON-RPC call)  

6. Projects  
- "Create new project ‘Website Redesign’ for Client ABC." → Projects → CreateProject (JSON-RPC call)  
- "Log $200 expense under Project #15." → Projects → CreateProjectExpense (JSON-RPC call)  
- "Update Project #12 status to Completed." → Projects → UpdateProject (JSON-RPC call)  
- "Show all active projects." → Projects → GetProjects (JSON-RPC call)  
```

## Quickstart (Dev)

Frontend
- cd frontend
- npm install
- npm run dev

Backend
- cd backend
- pip install -U uv
- uvicorn src.main:app --reload

Set `NEXT_PUBLIC_API_BASE` in the frontend to point to the backend (defaults to http://localhost:8000).

## Production-like with Docker

- docker compose up --build
  - Backend: http://localhost:8000
  - Frontend: http://localhost:3000

Adjust CORS origins in `backend/src/main.py` for production.

## Tests

- Frontend: `cd frontend && npm run test:run`
- Backend: `cd backend && pytest`

## Docs

- Contracts: `specs/001-build-an-application/contracts/`
- API index: `docs/api/README.md`
