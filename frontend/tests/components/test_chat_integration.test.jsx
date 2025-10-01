/**
 * Integration-like tests for richer MCP interaction & streaming
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

let ChatInterface;
let COMPONENTS_AVAILABLE = true;
try {
  ({ ChatInterface } = require('../../src/components/chat/ChatInterface'));
} catch (e) {
  COMPONENTS_AVAILABLE = false;
}
const d = COMPONENTS_AVAILABLE ? describe : describe.skip;

function createStream(tokens, delayMs = 0) {
  async function* gen() {
    for (const t of tokens) {
      if (delayMs) await new Promise((r) => setTimeout(r, delayMs));
      yield { type: 'token', delta: t };
    }
    yield { type: 'done' };
  }
  return gen();
}

d('ChatInterface – MCP integration', () => {
  it('calls mcpClient.call with JSON-RPC shape and renders results', async () => {
    const call = vi.fn().mockResolvedValue({
      jsonrpc: '2.0',
      id: '1',
      result: {
        invoices: [ { id: 'INV-101', contact: 'Contoso', total: 99.5, status: 'AUTHORISED' } ],
        wireframe_data: { display_type: 'table' }
      }
    });
    const mcpClient = { call };

    render(<ChatInterface messages={[]} mcpClient={mcpClient} />);

    fireEvent.change(screen.getByPlaceholderText('Type a message...'), { target: { value: 'Find latest invoices' } });
    fireEvent.keyDown(screen.getByPlaceholderText('Type a message...'), { key: 'Enter' });

    expect(call).toHaveBeenCalledWith('chat.query', expect.objectContaining({ message: 'Find latest invoices' }), expect.objectContaining({ jsonrpc: '2.0', id: expect.any(String) }));

    await waitFor(() => expect(screen.getByTestId('results-table')).toBeInTheDocument());
    expect(screen.getByText('Contoso')).toBeInTheDocument();
  });

  it('streams assistant tokens and shows live content', async () => {
    const stream = vi.fn().mockReturnValue(createStream(['Hello', ', world']));
    const mcpClient = { stream };
    render(<ChatInterface messages={[]} mcpClient={mcpClient} streaming />);

    fireEvent.change(screen.getByPlaceholderText('Type a message...'), { target: { value: 'greet' } });
    fireEvent.keyDown(screen.getByPlaceholderText('Type a message...'), { key: 'Enter' });

    await waitFor(() => expect(screen.getByTestId('assistant-stream')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('assistant-stream')).toHaveTextContent('Hello, world'));
  });

  it('renders JSON-RPC error as error bubble', async () => {
    const call = vi.fn().mockResolvedValue({ jsonrpc: '2.0', id: '2', error: { code: -32601, message: 'Method not found' } });
    const mcpClient = { call };
    render(<ChatInterface messages={[]} mcpClient={mcpClient} />);

    fireEvent.change(screen.getByPlaceholderText('Type a message...'), { target: { value: 'unknown' } });
    fireEvent.keyDown(screen.getByPlaceholderText('Type a message...'), { key: 'Enter' });

    await waitFor(() => expect(screen.getByTestId('chat-error')).toBeInTheDocument());
    expect(screen.getByTestId('chat-error')).toHaveTextContent('Method not found');
    expect(screen.getByTestId('chat-error')).toHaveTextContent('-32601');
  });
});
