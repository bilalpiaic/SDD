const React = require('react');

function MetricTile(props) {
  const { title, data } = props || {};
  const trend = data && data.trend;
  return React.createElement(
    'div',
    null,
    [
      title ? React.createElement('div', { key: 'title' }, title) : null,
      React.createElement('div', { key: 'trend', 'data-testid': trend ? `trend-${trend}` : 'trend-unknown' }),
      React.createElement('div', { key: 'value', 'data-testid': 'metric-value', className: trend ? `${trend}-trend` : undefined }),
    ]
  );
}

module.exports = { MetricTile };
module.exports.default = MetricTile;
