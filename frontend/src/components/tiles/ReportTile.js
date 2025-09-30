const React = require('react');

function ReportTile(props) {
  const { title, onExpand, data, mcp_source } = props || {};

  const handleExpand = () => {
    if (onExpand && data) {
      onExpand({
        tileId: props.id,
        reportType: data.report_type,
        fullReportParams: (mcp_source && mcp_source.params) || {},
      });
    }
  };

  return React.createElement(
    'div',
    { 'data-testid': 'report-tile' },
    [
      title ? React.createElement('div', { key: 'title' }, title) : null,
      React.createElement('div', { key: 'mini', 'data-testid': 'mini-chart' }),
      React.createElement('button', { key: 'expand', 'data-testid': 'expand-button', onClick: handleExpand }, 'Expand'),
    ]
  );
}

module.exports = { ReportTile };
module.exports.default = ReportTile;
