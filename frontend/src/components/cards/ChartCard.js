const React = require('react');

function ChartCard(props) {
  const { title, data } = props || {};
  return React.createElement(
    'div',
    { 'data-testid': 'chart-card' },
    [
      title ? React.createElement('div', { key: 'title' }, title) : null,
      Array.isArray(data)
        ? React.createElement(
            'ul',
            { key: 'data' },
            data.map((d, idx) => React.createElement('li', { key: idx }, d.label))
          )
        : null,
    ],
  );
}

module.exports = { ChartCard };
module.exports.default = ChartCard;
