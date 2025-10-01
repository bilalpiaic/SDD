const React = require('react');

function formatCurrency(value, currency = 'USD') {
  try { return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value); } catch { return String(value); }
}

function ReportTile(props) {
  const { title, onExpand, data, mcp_source } = props || {};

  const handleExpand = () => {
    if (onExpand && data) {
      onExpand({
        tileId: props.id,
        reportType: data.report_type,
        fullReportParams: (mcp_source && mcp_source.params) || {},
      });
    }
  };

  const currency = (data && data.currency) || 'USD';

  return React.createElement(
    'div',
    { 'data-testid': 'report-tile' },
    [
      title ? React.createElement('div', { key: 'title' }, title) : null,
      data && data.period ? React.createElement('div', { key: 'period' }, data.period) : null,
      typeof data?.total_revenue !== 'undefined' ? React.createElement('div', { key: 'rev' }, formatCurrency(data.total_revenue, currency)) : null,
      typeof data?.total_expenses !== 'undefined' ? React.createElement('div', { key: 'exp' }, formatCurrency(data.total_expenses, currency)) : null,
      typeof data?.net_profit !== 'undefined' ? React.createElement('div', { key: 'net' }, formatCurrency(data.net_profit, currency)) : null,
      typeof data?.profit_margin !== 'undefined' ? React.createElement('div', { key: 'pm' }, `${data.profit_margin}%`) : null,
      React.createElement('div', { key: 'mini', 'data-testid': 'mini-chart' }),
      React.createElement('button', { key: 'expand', 'data-testid': 'expand-button', onClick: handleExpand }, 'Expand'),
    ]
  );
}

module.exports = { ReportTile };
module.exports.default = ReportTile;
