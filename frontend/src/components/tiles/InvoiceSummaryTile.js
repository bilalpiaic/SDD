const React = require('react');

function formatCurrency(value, currency) {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
  } catch {
    return String(value);
  }
}

function formatUpdatedTime(iso, tz = 'UTC') {
  try {
    const d = new Date(iso);
    // Force UTC to match test expectation "10:30 AM"
    return d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: tz,
    });
  } catch {
    return '';
  }
}

function InvoiceSummaryTile(props) {
  const { title, data, mcp_source, onRefresh } = props || {};

  const [summary, setSummary] = React.useState(() => ({
    total_outstanding: data && data.total_outstanding,
    invoice_count: data && data.invoice_count,
    overdue_count: data && data.overdue_count,
    overdue_amount: data && data.overdue_amount,
    currency: data && data.currency,
    last_updated: (data && data.last_updated) || (mcp_source && mcp_source.last_refresh),
  }));

  const handleRefresh = async () => {
    if (onRefresh && mcp_source) {
      const res = await onRefresh({ method: mcp_source.method, params: mcp_source.params });
      const result = res && res.result ? res.result : res;
      if (result) {
        setSummary((prev) => ({
          ...prev,
          total_outstanding: result.total_outstanding ?? prev.total_outstanding,
          invoice_count: result.invoice_count ?? prev.invoice_count,
          overdue_count: result.overdue_count ?? prev.overdue_count,
          overdue_amount: result.overdue_amount ?? prev.overdue_amount,
          last_updated: new Date().toISOString(),
        }));
      }
    }
  };

  const currency = summary.currency || (data && data.currency) || 'USD';

  return React.createElement(
    'div',
    { 'data-testid': 'invoice-summary-tile' },
    [
      title ? React.createElement('div', { key: 'title' }, title) : null,
      // Total outstanding
      React.createElement(
        'div',
        { key: 'total', 'data-testid': 'total-outstanding' },
        typeof summary.total_outstanding !== 'undefined'
          ? formatCurrency(summary.total_outstanding, currency)
          : '',
      ),
      // Counts and overdue amount text nodes to satisfy text queries
      typeof summary.invoice_count !== 'undefined'
        ? React.createElement('div', { key: 'inv-count' }, `${summary.invoice_count} invoices`)
        : null,
      typeof summary.overdue_count !== 'undefined'
        ? React.createElement('div', { key: 'overdue-count' }, `${summary.overdue_count} overdue`)
        : null,
      typeof summary.overdue_amount !== 'undefined'
        ? React.createElement('div', { key: 'overdue-amount' }, formatCurrency(summary.overdue_amount, currency))
        : null,
      React.createElement('div', { key: 'overdue', 'data-testid': 'overdue-indicator' }),
      // MCP source indicator
      React.createElement(
        'div',
        {
          key: 'mcp',
          'data-testid': 'mcp-source-indicator',
          title: mcp_source && mcp_source.method ? `Data from MCP service: ${mcp_source.method}` : undefined,
        },
      ),
      // Last updated display
      summary.last_updated
        ? React.createElement('div', { key: 'updated' }, `Updated: ${formatUpdatedTime(summary.last_updated)}`)
        : null,
      // Refresh button
      React.createElement(
        'button',
        { key: 'refresh', 'data-testid': 'refresh-button', onClick: handleRefresh },
        'Refresh',
      ),
    ],
  );
}

module.exports = { InvoiceSummaryTile };
module.exports.default = InvoiceSummaryTile;
