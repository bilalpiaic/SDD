const React = require('react');

function Dashboard(props) {
  const { layout, onLayoutChange, onPersist, autoSaveDelay } = props || {};
  const [widgets, setWidgets] = React.useState(() => (layout && layout.widgets) || []);
  const draggedIdRef = React.useRef(null);

  const handleDragStart = (id) => (e) => {
    // Store in ref for test environments that don't implement dataTransfer
    draggedIdRef.current = id;
    if (e.dataTransfer && e.dataTransfer.setData) {
      e.dataTransfer.setData('text/plain', id);
    }
  };
  const handleDragEnter = (overId) => (e) => {
    e.preventDefault();
  };
  const handleDragOver = (overId) => (e) => {
    // Needed in browsers to allow dropping; harmless in tests
    e.preventDefault();
  };
  const handleDrop = (overId) => (e) => {
    e.preventDefault();
    const draggedId = (e.dataTransfer && e.dataTransfer.getData && e.dataTransfer.getData('text/plain')) || draggedIdRef.current || null;
    draggedIdRef.current = null;
    if (!draggedId || draggedId === overId) return;
    const fromIdx = widgets.findIndex((w) => w.id === draggedId);
    const toIdx = widgets.findIndex((w) => w.id === overId);
    if (fromIdx === -1 || toIdx === -1) return;
    const newWidgets = widgets.slice();
    const [moved] = newWidgets.splice(fromIdx, 1);
    newWidgets.splice(toIdx, 0, moved);
    setWidgets(newWidgets);
    onLayoutChange && onLayoutChange({ ...layout, widgets: newWidgets });
    if (onPersist) {
      const timeout = typeof autoSaveDelay === 'number' ? autoSaveDelay : 0;
      if (timeout <= 0) {
        onPersist({ ...layout, widgets: newWidgets });
      } else {
        setTimeout(() => onPersist({ ...layout, widgets: newWidgets }), timeout);
      }
    }
  };

  return React.createElement(
    'div',
    { 'data-testid': 'dashboard-grid' },
    widgets.map((w) =>
      React.createElement(
        'div',
        {
          key: w.id,
          'data-testid': 'dashboard-widget',
        },
        React.createElement(
          'div',
          {
            'data-testid': `dashboard-widget-${w.id}`,
            draggable: true,
            onDragStart: handleDragStart(w.id),
            onDragEnter: handleDragEnter(w.id),
            onDragOver: handleDragOver(w.id),
            onDrop: handleDrop(w.id),
          },
          w.type
        )
      )
    )
  );
}

module.exports = { Dashboard };
module.exports.default = Dashboard;
