import React from 'react';

export type ChatInputProps = {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  processInput?: (text: string) => string | Promise<string>;
  onChange?: (text: string) => void;
  onSend: (text: string) => void | Promise<void>;
  sendLabel?: string;
};

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  placeholder = 'Type a message...',
  disabled = false,
  processInput,
  onChange,
  onSend,
  sendLabel = 'Send',
}) => {
  const [internal, setInternal] = React.useState('');
  const isControlled = typeof value === 'string';
  const text = isControlled ? (value as string) : internal;
  const setText = (v: string) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  const doSend = async () => {
    if (!text || disabled) return;
    const processed = processInput ? await Promise.resolve(processInput(text)) : text;
    await onSend(processed);
    setText('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void doSend();
    }
  };

  return (
    <div data-testid="chat-input" style={{ display: 'flex', gap: 8 }}>
      <input
        data-testid="chat-input-field"
        type="text"
        value={text}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        style={{ flex: 1 }}
      />
      <button data-testid="chat-send-btn" disabled={disabled || !text} onClick={() => void doSend()}>
        {sendLabel}
      </button>
    </div>
  );
};

export default ChatInput;
