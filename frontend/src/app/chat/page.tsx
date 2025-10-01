"use client";
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
const ChatModule = require('@/components/chat/ChatInterface.js') as { default: React.ComponentType<any> };
const ChatInterface = ChatModule.default as React.ComponentType<any>;
import { getSessionId } from '@/utils/session';
import { sendMessage, getHistory } from '@/services/chat';

export default function ChatPage() {
  const [sessionId] = React.useState(getSessionId());
  const [messages, setMessages] = React.useState<Array<{ id: string; role: string; content: string }>>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const data = await getHistory(sessionId);
        const history = (data as any)?.history || [];
        setMessages(history.map((c: string, idx: number) => ({ id: String(idx), role: 'assistant', content: c })));
      } catch (e: any) {
        setError(String(e?.message || e));
      }
    })();
  }, [sessionId]);

  const onSend = async (text: string) => {
    setError(null);
    setMessages((prev) => [...prev, { id: String(Date.now()), role: 'user', content: text }]);
    try {
      const resp = await sendMessage(sessionId, text);
      const content = (resp as any)?.ui_response ? JSON.stringify((resp as any).ui_response) : 'OK';
      setMessages((prev) => [...prev, { id: String(Date.now() + 1), role: 'assistant', content }]);
    } catch (e: any) {
      setMessages((prev) => [...prev, { id: String(Date.now() + 2), role: 'error', content: String(e?.message || e) }]);
    }
  };

  return (
    <MainLayout>
      <h1 className="text-xl font-semibold mb-4">Chat</h1>
      {error && <div className="text-red-600">{error}</div>}
      <ChatInterface messages={messages} onSend={onSend} />
    </MainLayout>
  );
}
