import { api } from './api';

export type ChatMessage = { id?: string | number; role: 'user' | 'assistant' | 'error'; content: string };

export async function sendMessage(session_id: string, message: string) {
  return api.post(`/api/v1/chat/message`, { session_id, message });
}

export async function getHistory(session_id: string) {
  return api.get(`/api/v1/chat/history`, { session_id });
}
