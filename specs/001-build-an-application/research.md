# Research: Xero MCP Wireframe Chatbot

**Phase 0 Research Results**  
**Generated**: 2025-09-30  
**Input**: Implementation requirements and constitutional constraints

## Technology Decisions

### Backend Architecture Decision
**Decision**: FastAPI + OpenAI Agentic SDK + Python 3.11+  
**Rationale**: 
- FastAPI provides async performance required for <2s natural language processing
- OpenAI Agentic SDK offers built-in JSON-RPC client capabilities for MCP integration
- Python ecosystem has mature NLP libraries for natural language command interpretation
- Async/await patterns essential for handling concurrent user sessions and MCP calls

**Alternatives considered**: 
- Node.js + Express: Rejected due to less mature MCP tooling ecosystem
- Django: Rejected due to synchronous nature conflicting with real-time chat requirements

### Frontend Architecture Decision
**Decision**: NextJS 14+ + TailwindCSS + Lucid React + Framer Motion  
**Rationale**:
- NextJS provides server-side rendering for better initial load performance
- TailwindCSS aligns with wireframe-first UI principle (utility classes for minimal styling)
- Lucid React offers consistent iconography for wireframe elements
- Framer Motion enables smooth conversational animations without complex graphics
- TypeScript support ensures type safety for MCP response handling

**Alternatives considered**:
- Vue.js + Nuxt: Rejected due to smaller ecosystem for enterprise tooling
- React SPA: Rejected due to SEO and initial load performance concerns

### MCP Integration Pattern Decision
**Decision**: JSON-RPC 2.0 client wrapper with request/response normalization  
**Rationale**:
- Constitutional requirement for JSON-RPC protocol compliance
- Agentic SDK provides JSON-RPC client but needs wrapper for Xero-specific error handling
- Normalization layer abstracts MCP response differences between modules
- Enables future MCP module integration without frontend changes

**Alternatives considered**:
- Direct MCP HTTP calls: Rejected due to constitutional violation
- Custom protocol: Rejected due to standardization requirements

### Natural Language Processing Decision
**Decision**: OpenAI GPT integration with custom prompt engineering for Xero domain  
**Rationale**:
- Agentic SDK provides LLM integration patterns
- Custom prompts can map natural language to specific Xero MCP operations
- Intent classification reduces JSON-RPC call ambiguity
- Fallback to clarification prompts when intent uncertain

**Alternatives considered**:
- Local NLP models: Rejected due to accuracy and domain knowledge limitations
- Rule-based parsing: Rejected due to inflexibility for conversational interface

## Integration Patterns

### OAuth2 Flow Pattern
**Pattern**: Authorization Code Flow with PKCE for Xero  
**Implementation**:
- Frontend initiates OAuth2 redirect to Xero
- Backend handles authorization code exchange
- Session management with secure token storage
- Token refresh automation before MCP requests
- Graceful re-authentication on token expiry

### MCP Request Flow Pattern
**Pattern**: Command → Intent → JSON-RPC → Response Normalization  
**Implementation**:
1. User natural language input
2. LLM intent classification and parameter extraction  
3. JSON-RPC request construction with authentication
4. MCP server communication via Agentic SDK
5. Response normalization for wireframe rendering
6. Error handling with user-friendly messages

### Wireframe Rendering Pattern
**Pattern**: Data-driven component selection based on response type  
**Implementation**:
- Tile component: Individual records (invoices, contacts)
- Card component: Summary information (totals, status)
- Report Block component: Financial/operational reports
- Module Group component: Draggable containers
- Responsive grid layout with CSS Grid

### Error Handling Pattern
**Pattern**: Layered error handling with graceful degradation  
**Implementation**:
- Network errors: Retry logic with exponential backoff
- Authentication errors: Automatic re-authentication flow
- MCP errors: User-friendly error messages in wireframe format
- NLP errors: Clarification prompts for ambiguous commands

## Architectural Choices

### Deployment Architecture
**Choice**: Microservices with independent scaling  
**Backend**: Containerized FastAPI on cloud platform (AWS/GCP/Azure)
**Frontend**: Static site generation on Vercel CDN
**Benefits**: Independent scaling, fault isolation, easier updates

### State Management
**Choice**: Minimal client-side state with server-driven UI  
**Session State**: OAuth2 tokens, user preferences (backend)
**UI State**: Current conversation, layout preferences (frontend)
**Benefits**: Reduces complexity, easier debugging, consistent state

### Testing Strategy
**Choice**: Multi-layer testing pyramid  
**Unit Tests**: Individual functions and components
**Integration Tests**: JSON-RPC flows and API endpoints  
**Contract Tests**: MCP server API compliance
**E2E Tests**: Complete user workflows
**Benefits**: Comprehensive coverage, fast feedback loops

### Performance Optimization
**Choice**: Caching and lazy loading strategy  
**Backend**: Response caching for repeated MCP queries
**Frontend**: Component lazy loading, virtual scrolling for large datasets
**Network**: HTTP/2, compression, CDN for static assets
**Benefits**: Meets <2s performance requirements, good user experience

## Security Considerations

### Authentication Security
- OAuth2 tokens stored in secure HTTP-only cookies
- CSRF protection for all state-changing operations
- Token encryption at rest
- Session timeout and rotation policies

### Data Security  
- No persistent storage of Xero data (privacy by design)
- TLS 1.3 for all communications
- Input validation and sanitization
- Rate limiting for API endpoints

### Authorization Security
- Role-based access control aligned with Xero permissions
- Confirmation prompts for destructive operations
- Audit logging for compliance requirements
- Principle of least privilege for MCP requests

---

## Research Summary

All technology choices align with constitutional requirements and support the primary goal of a conversational Xero interface. The architecture enables:

1. **MCP-First Integration**: Exclusive use of Xero-MCP-Server via JSON-RPC
2. **Performance**: <2s natural language processing through async architecture  
3. **Extensibility**: Plugin architecture for new MCP modules
4. **User Experience**: Wireframe-first UI with drag-and-drop capabilities
5. **Security**: Enterprise-grade OAuth2 and data protection

**Ready for Phase 1**: Design artifacts (data models, contracts, quickstart guide)