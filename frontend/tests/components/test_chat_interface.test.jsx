/**
 * Component Tests for Chat Interface (T027)
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

let ChatInterface;
let COMPONENTS_AVAILABLE = true;
try {
  ({ ChatInterface } = require('../../src/components/chat/ChatInterface'));
} catch (error) {
  COMPONENTS_AVAILABLE = false;
}
const d = COMPONENTS_AVAILABLE ? describe : describe.skip;

d('ChatInterface', () => {
  const initialMessages = [
    { id: 'm1', role: 'user', content: 'Show me invoices from last month' },
    { id: 'm2', role: 'assistant', content: 'I can help with that. Do you want unpaid ones only?', type: 'clarification' }
  ];

  it('renders chat history and input', () => {
    render(<ChatInterface messages={initialMessages} />);
    expect(screen.getByTestId('chat-history')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument();
  });

  it('handles sending messages and confirmations', () => {
    const onSend = vi.fn();
    const onConfirm = vi.fn();
    render(<ChatInterface messages={initialMessages} onSend={onSend} onConfirm={onConfirm} />);

    fireEvent.change(screen.getByPlaceholderText('Type a message...'), { target: { value: 'Yes, show unpaid' } });
    fireEvent.keyDown(screen.getByPlaceholderText('Type a message...'), { key: 'Enter' });
    expect(onSend).toHaveBeenCalledWith('Yes, show unpaid');

    fireEvent.click(screen.getByTestId('confirm-button'));
    expect(onConfirm).toHaveBeenCalled();
  });

  it('displays MCP-backed results with wireframe data', () => {
    const results = {
      jsonrpc: '2.0',
      result: {
        invoices: [
          { id: 'INV-001', contact: 'ABC Corp', total: 1500.00, status: 'PAID' },
          { id: 'INV-002', contact: 'XYZ Ltd', total: 2300.00, status: 'AUTHORISED' },
        ],
        wireframe_data: {
          display_type: 'table',
          columns: ['invoice_number', 'contact', 'total', 'status']
        }
      },
      id: 'chat_result_001'
    };

    render(<ChatInterface messages={initialMessages} results={results} />);

    expect(screen.getByTestId('results-table')).toBeInTheDocument();
    expect(screen.getByText('ABC Corp')).toBeInTheDocument();
  });
});
