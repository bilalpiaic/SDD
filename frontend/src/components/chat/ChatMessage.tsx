import React from 'react';

export type ChatRole = 'user' | 'assistant' | 'system' | 'error';

export type ChatMessageProps = {
  role: ChatRole;
  content?: string;
  timestamp?: string | number | Date;
  results?: Array<Record<string, unknown>>; // optional tabular results to show
};

function classForRole(role: ChatRole): string {
  switch (role) {
    case 'user':
      return 'chat-bubble user';
    case 'assistant':
      return 'chat-bubble assistant';
    case 'error':
      return 'chat-bubble error';
    default:
      return 'chat-bubble';
  }
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, timestamp, results }) => {
  return (
    <div data-testid={`chat-message-${role}`} className={classForRole(role)}>
      {content && <div data-testid="chat-message-content">{content}</div>}
      {timestamp && <div data-testid="chat-message-time">{new Date(timestamp).toLocaleString()}</div>}
      {Array.isArray(results) && results.length > 0 ? (
        <table data-testid="chat-message-results">
          <thead>
            <tr>
              {Object.keys(results[0] || {}).map((k) => (
                <th key={k}>{k}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((row, idx) => (
              <tr key={idx}>
                {Object.keys(results[0] || {}).map((k) => (
                  <td key={k}>{String((row as any)[k] ?? '')}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default ChatMessage;
