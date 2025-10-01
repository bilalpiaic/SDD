import React from 'react';
import ChatMessage, { ChatRole } from './ChatMessage';

export type HistoryItem = {
  id?: string | number;
  role: ChatRole;
  content?: string;
  timestamp?: string | number | Date;
  results?: Array<Record<string, unknown>>;
};

export type ChatHistoryProps = {
  items: HistoryItem[];
};

export const ChatHistory: React.FC<ChatHistoryProps> = ({ items }) => {
  return (
    <div data-testid="chat-history">
      {items.map((m, idx) => (
        <ChatMessage key={m.id ?? idx} role={m.role} content={m.content} timestamp={m.timestamp} results={m.results} />
      ))}
    </div>
  );
};

export default ChatHistory;
