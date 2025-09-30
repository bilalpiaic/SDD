# Quickstart Guide: Xero MCP Wireframe Chatbot

**Setup Time**: 30 minutes  
**Prerequisites**: Python 3.11+, Node.js 18+, Xero Developer Account  
**Architecture**: Separated frontend/backend with MCP integration

## 1. Environment Setup

### Backend Setup (FastAPI + Agentic SDK)
```bash
# Clone repository and navigate to backend
cd backend/

# Initialize UV environment
uv init
uv add fastapi agentic-sdk python-multipart uvicorn python-jose cryptography

# Environment variables
cp .env.example .env
```

**.env configuration**:
```env
# Xero OAuth2 Configuration
XERO_CLIENT_ID=your_xero_client_id
XERO_CLIENT_SECRET=your_xero_client_secret
XERO_REDIRECT_URI=http://localhost:3000/auth/callback

# MCP Configuration  
MCP_SERVER_URL=http://localhost:8001
JSON_RPC_TIMEOUT=30

# Security
JWT_SECRET_KEY=your_jwt_secret_key
SESSION_TIMEOUT=14400  # 4 hours

# Development
DEBUG=true
LOG_LEVEL=info
```

### Frontend Setup (NextJS + TailwindCSS)
```bash
# Navigate to frontend
cd frontend/

# Install dependencies
npm install

# Environment variables
cp .env.example .env.local
```

**.env.local configuration**:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_ENVIRONMENT=development
```

## 2. Development Server Startup

### Terminal 1: Backend Server
```bash
cd backend/
uv run uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

### Terminal 2: Frontend Server  
```bash
cd frontend/
npm run dev
```

### Terminal 3: MCP Server (if running locally)
```bash
# Follow Xero-MCP-Server documentation
python -m xero_mcp_server --port 8001
```

## 3. First User Flow

### Step 1: Access Application
- Navigate to `http://localhost:3000`
- Click "Connect to Xero" button
- Complete OAuth2 authentication flow

### Step 2: Test Natural Language Commands
Try these sample commands in the chat interface:

**Basic Invoice Operations**:
- "Show me unpaid invoices"
- "Create invoice for ABC Corp, $500, due next month"
- "Update invoice INV-001 status to paid"

**Report Generation**:
- "Generate balance sheet for this quarter"
- "Show profit and loss for last month"
- "List overdue receivables"

**Contact Management**:
- "Add new contact John Smith, email john@example.com"
- "Show all customers"
- "Find contacts with outstanding balances"

### Step 3: Test Wireframe UI
- Observe results displayed as tiles, cards, and report blocks
- Drag and drop module groups to reorganize dashboard
- Verify layout persistence after refresh

## 4. Configuration Options

### Performance Tuning
```python
# backend/src/config.py
PERFORMANCE_CONFIG = {
    "nlp_timeout": 2.0,  # Natural language processing timeout
    "mcp_timeout": 5.0,  # MCP request timeout
    "cache_ttl": 300,    # Response cache TTL (seconds)
    "max_elements": 100  # Max wireframe elements per layout
}
```

### UI Customization
```typescript
// frontend/src/config/wireframe.ts
export const WIREFRAME_CONFIG = {
  tile: {
    maxWidth: '300px',
    minHeight: '120px',
    spacing: '16px'
  },
  card: {
    maxWidth: '400px', 
    minHeight: '200px'
  },
  reportBlock: {
    minWidth: '600px',
    minHeight: '400px'
  }
}
```

### MCP Module Configuration
```python
# backend/src/mcp/modules.py
ENABLED_MODULES = [
    'accounting',   # Invoices, Contacts, Accounts, Transactions
    'reports',      # Balance Sheet, P&L, Aged Receivables
    'hr',          # Employees, Leave Management
    'payroll',     # Pay Runs, Payslips  
    'assets',      # Asset Register, Depreciation
    'bankfeeds',   # Bank Reconciliation
    'projects'     # Project Tracking, Expenses
]
```

## 5. Testing & Validation

### Backend Testing
```bash
cd backend/
uv run pytest tests/ -v

# Specific test categories
uv run pytest tests/contract/ -v     # JSON-RPC contract tests
uv run pytest tests/integration/ -v # End-to-end flow tests
uv run pytest tests/unit/ -v        # Unit tests
```

### Frontend Testing
```bash
cd frontend/
npm run test                    # Unit tests
npm run test:e2e               # End-to-end tests
npm run test:visual            # Visual regression tests
```

### Manual Testing Checklist
- [ ] OAuth2 authentication flow completes successfully
- [ ] Natural language commands translate to correct MCP requests
- [ ] All Xero modules accessible through chat interface
- [ ] Wireframe elements render correctly (tiles, cards, reports)
- [ ] Drag-and-drop dashboard reordering works
- [ ] Confirmation prompts appear for destructive operations
- [ ] Error handling graceful for invalid commands
- [ ] Session persistence across browser refresh
- [ ] Performance meets < 2s response time requirement

## 6. Common Issues & Solutions

### Authentication Issues
**Problem**: OAuth2 callback fails  
**Solution**: Verify XERO_REDIRECT_URI matches Xero app configuration

**Problem**: Token refresh errors  
**Solution**: Check JWT_SECRET_KEY consistency and session timeout settings

### MCP Integration Issues  
**Problem**: JSON-RPC requests timeout  
**Solution**: Verify MCP server running and increase JSON_RPC_TIMEOUT

**Problem**: Method not found errors  
**Solution**: Check MCP module enabled and method name spelling

### UI/UX Issues
**Problem**: Wireframe elements not rendering  
**Solution**: Check API response structure matches expected format

**Problem**: Drag-and-drop not working  
**Solution**: Verify React DnD configuration and CSS pointer events

## 7. Production Deployment

### Backend Deployment (Docker)
```dockerfile
# Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY pyproject.toml .
RUN pip install uv && uv install
COPY . .
EXPOSE 8000
CMD ["uv", "run", "uvicorn", "src.main:app", "--host", "0.0.0.0"]
```

### Frontend Deployment (Vercel)
```bash
# Build and deploy
npm run build
vercel --prod
```

### Environment Variables (Production)
```env
# Security - Use strong values
JWT_SECRET_KEY=<strong-random-key>
XERO_CLIENT_SECRET=<production-secret>

# URLs - Update for production
XERO_REDIRECT_URI=https://yourapp.com/auth/callback
MCP_SERVER_URL=https://mcp.yourapp.com

# Performance
DEBUG=false
LOG_LEVEL=warning
```

## 8. Monitoring & Maintenance

### Health Checks
- Backend: `GET /health` endpoint
- Frontend: Automated uptime monitoring
- MCP: JSON-RPC ping requests

### Logging
- Application logs: Structured JSON format
- Error tracking: Automated error reporting
- Performance metrics: Response time monitoring

### Updates
- Regular OAuth2 token rotation
- MCP server version compatibility
- Dependency security updates

---

**Next Steps**:
1. Complete environment setup following this guide
2. Test basic functionality with sample commands
3. Customize wireframe styling for your brand
4. Configure additional MCP modules as needed
5. Deploy to production environment

**Support**: Refer to individual component documentation for detailed troubleshooting