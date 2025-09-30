const React = require('react');

function Card(props) {
  const { id, title, subtitle, actions, footer, onAction, children } = props || {};

  const handleAction = (action) => () => {
    if (onAction) onAction({ actionId: action.id });
  };

  return React.createElement(
    'div',
    { 'data-testid': 'card-root', 'data-card-id': id },
    [
      React.createElement(
        'div',
        { key: 'header', 'data-testid': 'card-header' },
        [
          title ? React.createElement('h3', { key: 'title' }, title) : null,
          subtitle ? React.createElement('div', { key: 'subtitle' }, subtitle) : null,
          Array.isArray(actions)
            ? React.createElement(
                'div',
                { key: 'actions', 'data-testid': 'card-actions' },
                actions.map((a) =>
                  React.createElement(
                    'button',
                    {
                      key: a.id,
                      'data-testid': `card-action-${a.id}`,
                      onClick: handleAction(a),
                      type: 'button',
                    },
                    a.label,
                  ),
                ),
              )
            : null,
        ],
      ),
      React.createElement('div', { key: 'body', 'data-testid': 'card-body' }, children),
      footer && footer.text
        ? React.createElement(
            'div',
            { key: 'footer', 'data-testid': 'card-footer' },
            footer.text,
          )
        : null,
    ],
  );
}

module.exports = { Card };
module.exports.default = Card;
