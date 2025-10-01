const React = require('react');

function formatCurrency(value, currency = 'USD') {
  try { return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value); } catch { return String(value); }
}

function MetricTile(props) {
  const { title, data } = props || {};
  const trend = data && data.trend;
  const currency = data && data.currency || 'USD';
  const changeSign = typeof data?.change_amount === 'number' && data.change_amount > 0 ? '+' : '';
  const percentSign = typeof data?.change_percentage === 'number' && data.change_percentage > 0 ? '+' : '';

  return React.createElement(
    'div',
    null,
    [
      title ? React.createElement('div', { key: 'title' }, title) : null,
      typeof data?.current_value !== 'undefined'
        ? React.createElement('div', { key: 'cur' }, formatCurrency(data.current_value, currency))
        : null,
      typeof data?.change_amount !== 'undefined'
        ? React.createElement('div', { key: 'chgAmt' }, `${changeSign}${formatCurrency(data.change_amount, currency)}`)
        : null,
      typeof data?.change_percentage !== 'undefined'
        ? React.createElement('div', { key: 'chgPct' }, `${percentSign}${data.change_percentage}%`)
        : null,
      data?.period ? React.createElement('div', { key: 'period' }, data.period) : null,
      React.createElement('div', { key: 'trend', 'data-testid': trend ? `trend-${trend}` : 'trend-unknown' }),
      React.createElement('div', { key: 'value', 'data-testid': 'metric-value', className: trend ? `${trend}-trend` : undefined }),
    ]
  );
}

module.exports = { MetricTile };
module.exports.default = MetricTile;
