const React = require('react');

function ListCard(props) {
  const { title, items, pagination } = props || {};
  return React.createElement(
    'div',
    { 'data-testid': 'list-card' },
    [
      title ? React.createElement('div', { key: 'title' }, title) : null,
      Array.isArray(items)
        ? React.createElement(
            'ul',
            { key: 'list' },
            items.map((i) =>
              React.createElement('li', { key: i.id }, [
                React.createElement('span', { key: 'label' }, i.label),
                i.value ? React.createElement('span', { key: 'value' }, i.value) : null,
                i.meta ? React.createElement('span', { key: 'meta' }, i.meta) : null,
              ]),
            ),
          )
        : null,
      pagination
        ? React.createElement('div', { key: 'pagination', 'data-testid': 'pagination' },
            `${pagination.page}/${Math.ceil((pagination.total || 0) / (pagination.pageSize || 1) || 1)}`)
        : null,
    ],
  );
}

module.exports = { ListCard };
module.exports.default = ListCard;
