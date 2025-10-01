const React = require('react');

function ReportFilters(props) {
  const { presets, onApply } = props || {};
  const [selected, setSelected] = React.useState();
  return React.createElement(
    'div',
    { 'data-testid': 'report-filters' },
    [
      ...(Array.isArray(presets)
        ? presets.map((p) =>
            React.createElement(
              'button',
              { key: p, onClick: () => setSelected(p) },
              p,
            )
          )
        : []),
      React.createElement(
        'button',
        { key: 'apply', 'data-testid': 'apply-filters', onClick: () => onApply && onApply({ preset: selected }) },
        'Apply',
      ),
    ]
  );
}

module.exports = { ReportFilters };
module.exports.default = ReportFilters;
