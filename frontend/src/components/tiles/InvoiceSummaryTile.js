const React = require('react');

function InvoiceSummaryTile(props) {
  const { title, data, mcp_source, onRefresh } = props || {};

  const handleRefresh = () => {
    if (onRefresh && mcp_source) {
      onRefresh({ method: mcp_source.method, params: mcp_source.params });
    }
  };

  return React.createElement(
    'div',
    { 'data-testid': 'invoice-summary-tile' },
    [
      title ? React.createElement('div', { key: 'title' }, title) : null,
      React.createElement('div', { key: 'total', 'data-testid': 'total-outstanding' },
        data && typeof data.total_outstanding !== 'undefined' ? String(data.total_outstanding) : ''
      ),
      React.createElement('div', { key: 'overdue', 'data-testid': 'overdue-indicator' }),
      React.createElement(
        'div',
        {
          key: 'mcp',
          'data-testid': 'mcp-source-indicator',
          title: mcp_source && mcp_source.method ? `Data from MCP service: ${mcp_source.method}` : undefined,
        },
      ),
      React.createElement(
        'button',
        { key: 'refresh', 'data-testid': 'refresh-button', onClick: handleRefresh },
        'Refresh'
      ),
    ]
  );
}

module.exports = { InvoiceSummaryTile };
module.exports.default = InvoiceSummaryTile;
