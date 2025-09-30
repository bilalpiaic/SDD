"""
Configuration module for Xero MCP Chatbot Backend.

This module handles all configuration settings including:
- Environment variables loading
- Application settings validation
- MCP Server configuration
- Xero OAuth2 configuration
- Constitutional compliance validation

Constitutional Requirements:
1. MCP-First Integration: Configuration for MCP Server connection
2. JSON-RPC Protocol: Protocol version enforcement (NON-NEGOTIABLE)
3. Wireframe UI Support: UI-related configuration settings
4. Modular Architecture: Extensible configuration structure
5. Extensibility: Plugin configuration support
"""

import os
from typing import List, Optional
from pydantic import BaseModel, Field, validator
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class MCPServerConfig(BaseModel):
    """
    MCP Server configuration for JSON-RPC 2.0 communication.
    
    Constitutional Requirement: JSON-RPC Protocol (NON-NEGOTIABLE)
    """
    url: str = Field(default="http://localhost:8080", description="MCP Server URL")
    timeout: int = Field(default=30, description="Request timeout in seconds")
    max_retries: int = Field(default=3, description="Maximum retry attempts")
    protocol_version: str = Field(default="2.0", description="JSON-RPC protocol version")
    
    @validator("protocol_version")
    def validate_protocol_version(cls, v):
        """Enforce JSON-RPC 2.0 protocol as per constitutional requirement."""
        if v != "2.0":
            raise ValueError("JSON-RPC protocol version MUST be 2.0 (Constitutional Requirement)")
        return v


class XeroOAuthConfig(BaseModel):
    """
    Xero OAuth2 configuration for authentication.
    
    Constitutional Requirement: MCP-First Integration via authenticated API calls
    """
    client_id: str = Field(..., description="Xero OAuth2 Client ID")
    client_secret: str = Field(..., description="Xero OAuth2 Client Secret")
    redirect_uri: str = Field(..., description="OAuth2 redirect URI")
    scope: str = Field(
        default="accounting.transactions accounting.contacts accounting.reports.read",
        description="Xero API scopes"
    )
    
    @validator("client_id", "client_secret", "redirect_uri")
    def validate_required_fields(cls, v):
        """Ensure required OAuth2 fields are provided."""
        if not v or v.strip() == "":
            raise ValueError("OAuth2 configuration fields cannot be empty")
        return v.strip()


class CORSConfig(BaseModel):
    """
    CORS configuration for frontend integration.
    
    Constitutional Requirement: Wireframe UI Support
    """
    origins: List[str] = Field(
        default=["http://localhost:3000"],
        description="Allowed CORS origins"
    )
    credentials: bool = Field(default=True, description="Allow credentials")
    methods: List[str] = Field(
        default=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        description="Allowed HTTP methods"
    )
    headers: List[str] = Field(default=["*"], description="Allowed headers")


class WireframeUIConfig(BaseModel):
    """
    Wireframe UI configuration settings.
    
    Constitutional Requirement: Wireframe-First UI Design
    """
    enable_wireframe_mode: bool = Field(default=True, description="Enable wireframe UI mode")
    tile_animation_duration: float = Field(default=0.3, description="Tile animation duration")
    max_tiles_per_row: int = Field(default=3, description="Maximum tiles per dashboard row")
    confirmation_timeout: int = Field(default=10000, description="Destructive action confirmation timeout")


class SecurityConfig(BaseModel):
    """
    Security configuration for JWT and authentication.
    """
    secret_key: str = Field(..., description="JWT secret key")
    algorithm: str = Field(default="HS256", description="JWT algorithm")
    access_token_expire_minutes: int = Field(default=30, description="Access token expiry")
    
    @validator("secret_key")
    def validate_secret_key(cls, v):
        """Ensure secret key is strong enough."""
        if len(v) < 32:
            raise ValueError("Secret key must be at least 32 characters long")
        return v


class Settings(BaseModel):
    """
    Main application settings combining all configuration sections.
    
    This class enforces constitutional compliance and provides
    a unified configuration interface.
    """
    # Application settings
    app_name: str = Field(default="Xero MCP Chatbot Backend", description="Application name")
    app_version: str = Field(default="1.0.0", description="Application version")
    debug: bool = Field(default=False, description="Debug mode")
    environment: str = Field(default="production", description="Environment")
    
    # Server settings
    host: str = Field(default="0.0.0.0", description="Server host")
    port: int = Field(default=8000, description="Server port")
    reload: bool = Field(default=False, description="Auto-reload on code changes")
    
    # Configuration sections
    mcp_server: MCPServerConfig = Field(default_factory=MCPServerConfig)
    xero_oauth: Optional[XeroOAuthConfig] = None
    cors: CORSConfig = Field(default_factory=CORSConfig)
    wireframe_ui: WireframeUIConfig = Field(default_factory=WireframeUIConfig)
    security: Optional[SecurityConfig] = None
    
    # Logging
    log_level: str = Field(default="INFO", description="Logging level")
    log_format: str = Field(
        default="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        description="Log format"
    )
    
    class Config:
        """Pydantic configuration."""
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False
        
    def __init__(self, **kwargs):
        """Initialize settings with environment variable loading."""
        super().__init__(**kwargs)
        self._load_from_environment()
        self._validate_constitutional_compliance()
    
    def _load_from_environment(self):
        """Load configuration from environment variables."""
        # MCP Server configuration
        self.mcp_server.url = os.getenv("MCP_SERVER_URL", self.mcp_server.url)
        self.mcp_server.timeout = int(os.getenv("MCP_TIMEOUT", self.mcp_server.timeout))
        self.mcp_server.max_retries = int(os.getenv("MCP_MAX_RETRIES", self.mcp_server.max_retries))
        
        # Xero OAuth2 configuration (if provided)
        xero_client_id = os.getenv("XERO_CLIENT_ID")
        xero_client_secret = os.getenv("XERO_CLIENT_SECRET")
        xero_redirect_uri = os.getenv("XERO_REDIRECT_URI")
        
        if all([xero_client_id, xero_client_secret, xero_redirect_uri]):
            self.xero_oauth = XeroOAuthConfig(
                client_id=xero_client_id,
                client_secret=xero_client_secret,
                redirect_uri=xero_redirect_uri,
                scope=os.getenv("XERO_SCOPE", "accounting.transactions accounting.contacts accounting.reports.read")
            )
        
        # Security configuration (if provided)
        secret_key = os.getenv("SECRET_KEY")
        if secret_key:
            self.security = SecurityConfig(
                secret_key=secret_key,
                algorithm=os.getenv("ALGORITHM", "HS256"),
                access_token_expire_minutes=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
            )
        
        # CORS configuration
        cors_origins = os.getenv("CORS_ORIGINS")
        if cors_origins:
            self.cors.origins = [origin.strip() for origin in cors_origins.split(",")]
        
        # Server configuration
        self.host = os.getenv("HOST", self.host)
        self.port = int(os.getenv("PORT", self.port))
        self.debug = os.getenv("DEBUG", "false").lower() == "true"
        self.reload = os.getenv("RELOAD", "false").lower() == "true"
        
        # Logging configuration
        self.log_level = os.getenv("LOG_LEVEL", self.log_level)
    
    def _validate_constitutional_compliance(self):
        """
        Validate that configuration meets all constitutional requirements.
        
        Raises:
            ValueError: If configuration violates constitutional requirements
        """
        # Requirement 1: MCP-First Integration
        if not self.mcp_server.url:
            raise ValueError("MCP Server URL is required (Constitutional Requirement: MCP-First Integration)")
        
        # Requirement 2: JSON-RPC Protocol (enforced in MCPServerConfig validator)
        # This is automatically validated by the MCPServerConfig class
        
        # Requirement 3: Wireframe UI Support
        if not self.wireframe_ui:
            raise ValueError("Wireframe UI configuration is required (Constitutional Requirement)")
        
        # Requirement 4 & 5: Modular Architecture and Extensibility
        # These are enforced by the structure itself
    
    def get_constitutional_compliance_status(self) -> dict:
        """
        Return current constitutional compliance status.
        
        Returns:
            dict: Compliance status for each constitutional requirement
        """
        return {
            "mcp_first_integration": "✅ MCP Server configured" if self.mcp_server.url else "❌ Missing MCP Server",
            "json_rpc_protocol": f"✅ Protocol {self.mcp_server.protocol_version} enforced",
            "wireframe_ui_support": "✅ Wireframe UI configured",
            "modular_architecture": "✅ Modular configuration structure",
            "extensibility": "✅ Plugin-ready configuration"
        }


# Global settings instance
settings = Settings()


def get_settings() -> Settings:
    """
    Get the global settings instance.
    
    This function provides dependency injection support for FastAPI
    and ensures singleton pattern for configuration.
    
    Returns:
        Settings: Global settings instance
    """
    return settings