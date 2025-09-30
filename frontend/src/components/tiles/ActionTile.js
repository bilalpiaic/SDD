const React = require('react');

function ActionTile(props) {
  const { title, actions, onAction } = props || {};

  const handle = (a) => () => {
    if (onAction) {
      onAction({
        actionId: a.id,
        actionType: a.action_type,
        target: a.target,
        mcpMethod: a.mcp_method,
      });
    }
  };

  return React.createElement(
    'div',
    { 'data-testid': 'action-tile' },
    [
      title ? React.createElement('div', { key: 'title' }, title) : null,
      ...(Array.isArray(actions) ? actions.map((a) =>
        React.createElement('button', {
          key: a.id,
          'data-testid': `action-button-${a.id}`,
          onClick: handle(a),
        }, a.label)
      ) : []),
    ]
  );
}

module.exports = { ActionTile };
module.exports.default = ActionTile;
