const React = require('react');
const { ReportTable } = require('./ReportTable');

function ReportSection(props) {
  // This wrapper simply re-exports the inline section used by ReportBlock for import compatibility.
  // For now, we render a simple placeholder; ReportBlock uses its own internal section component.
  const { title } = props || {};
  return React.createElement('div', { 'data-testid': 'report-section' }, title || '');
}

module.exports = { ReportSection };
module.exports.default = ReportSection;
