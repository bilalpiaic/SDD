import { api } from './api';

export type OAuthInitiateResponse = { auth_url: string };
export type OAuthExchangeResponse = { access_token: string; refresh_token?: string; expires_in?: number };

let tokens: OAuthExchangeResponse | null = null;

export function getTokens(): OAuthExchangeResponse | null {
  return tokens;
}

export async function initiateOAuth(state?: string): Promise<OAuthInitiateResponse> {
  return api.post<OAuthInitiateResponse, { state?: string }>(`/api/v1/auth/oauth/initiate`, { state });
}

export async function exchangeCode(code: string): Promise<OAuthExchangeResponse> {
  const res = await api.post<OAuthExchangeResponse, { code: string }>(`/api/v1/auth/oauth/exchange`, { code });
  tokens = res;
  return res;
}
