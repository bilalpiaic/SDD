export type JSONRPCVersion = '2.0';

export type JSONRPCError = {
  code: number;
  message: string;
  data?: unknown;
};

export type MCPAuthContext = {
  xero_organization_id?: string | null;
  access_token?: string | null;
  refresh_token?: string | null;
};

export type MCPRequest<TParams = unknown> = {
  jsonrpc: JSONRPCVersion;
  method: string;
  id: string | number;
  params?: TParams;
  auth_context?: MCPAuthContext;
};

export type MCPResponse<TResult = unknown> = {
  jsonrpc: JSONRPCVersion;
  id: string | number;
  result?: TResult;
  error?: JSONRPCError | null;
};

// Example typed results often used by UI components
export type InvoiceSummary = {
  total_revenue?: number;
  total_expenses?: number;
  net_profit?: number;
  profit_margin?: number;
  currency?: string;
  period?: string;
};

export type TableRow = Record<string, string | number | null | undefined>;
