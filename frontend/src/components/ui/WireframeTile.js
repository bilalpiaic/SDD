const React = require('react');

function WireframeTile(props) {
  const { id, title, type, size, position, data, wireframe_metadata } = props || {};

  const handleClick = () => {
    props && props.onClick && props.onClick({ tileId: id, action: 'click', data });
  };

  const handleDragStart = () => {
    props && props.onDragStart && props.onDragStart({ tileId: id, position, size });
  };

  const handleDragEnd = () => {
    props && props.onDragEnd && props.onDragEnd({ tileId: id, newPosition: { x: 0, y: 0 } });
  };

  const handleResizeEnd = () => {
    props && props.onResize && props.onResize({ tileId: id, newSize: { width: (size && size.width) || 0, height: (size && size.height) || 0 } });
  };

  const children = [];
  if (title) children.push(React.createElement('div', { key: 'title' }, title));
  children.push(React.createElement('div', { key: 'content', 'data-testid': 'tile-content' }));

  if (wireframe_metadata && wireframe_metadata.resizable) {
    children.push(
      React.createElement('div', { key: 'rh-se', 'data-testid': 'resize-handle-se', onMouseDown: () => {}, onMouseUp: handleResizeEnd }),
      React.createElement('div', { key: 'rh-e', 'data-testid': 'resize-handle-e' }),
      React.createElement('div', { key: 'rh-s', 'data-testid': 'resize-handle-s' }),
    );
  }

  return React.createElement(
    'div',
    {
      className: 'wireframe-tile',
      'data-testid': 'wireframe-tile',
      'data-tile-id': id,
      'data-tile-type': type,
      draggable: true,
      onClick: handleClick,
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
    },
    children,
  );
}

module.exports = { WireframeTile };
module.exports.default = WireframeTile;
