const React = require('react');

function ReportTable({ columns, rows }) {
  return React.createElement(
    'table',
    { 'data-testid': 'report-table' },
    [
      React.createElement(
        'thead',
        { key: 'thead' },
        React.createElement(
          'tr',
          null,
          (columns || []).map((c, idx) => React.createElement('th', { key: idx }, c))
        )
      ),
      React.createElement(
        'tbody',
        { key: 'tbody' },
        (rows || []).map((r, idx) =>
          React.createElement(
            'tr',
            { key: idx },
            r.map((cell, cidx) => React.createElement('td', { key: cidx }, String(cell)))
          )
        )
      ),
    ]
  );
}

module.exports = { ReportTable };
module.exports.default = ReportTable;
