const KEY = 'xero_mcp_session_id';

export function getSessionId(): string {
  if (typeof window === 'undefined') return 's1';
  let id = window.localStorage.getItem(KEY);
  if (!id) {
    id = `s_${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(KEY, id);
  }
  return id;
}
