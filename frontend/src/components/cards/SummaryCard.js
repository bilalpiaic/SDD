const React = require('react');

function formatCurrency(value, currency) {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
  } catch {
    return String(value);
  }
}

function SummaryCard(props) {
  const { title, value, currency, trend, changePercent } = props || {};
  return React.createElement(
    'div',
    { 'data-testid': 'summary-card' },
    [
      title ? React.createElement('div', { key: 'title' }, title) : null,
      typeof value !== 'undefined'
        ? React.createElement('div', { key: 'value' }, formatCurrency(value, currency))
        : null,
      trend ? React.createElement('div', { key: 'trend', 'data-testid': `trend-${trend}` }) : null,
      typeof changePercent !== 'undefined'
        ? React.createElement('div', { key: 'change' }, `${changePercent > 0 ? '+' : ''}${changePercent}%`)
        : null,
    ],
  );
}

module.exports = { SummaryCard };
module.exports.default = SummaryCard;
