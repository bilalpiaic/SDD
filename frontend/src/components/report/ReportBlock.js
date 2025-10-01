const React = require('react');

function formatCurrency(value, currency = 'USD') {
  try { return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value); } catch { return String(value); }
}

function ReportSection({ section, collapsible }) {
  const [open, setOpen] = React.useState(true);
  const toggle = () => setOpen((o) => !o);
  return React.createElement(
    'div',
    { 'data-testid': `section-${section.id}` },
    [
      React.createElement(
        'div',
        { key: 'header' },
        [
          React.createElement('span', { key: 'title' }, section.title),
          collapsible
            ? React.createElement('button', { key: 'btn', 'data-testid': `toggle-section-${section.id}`, onClick: toggle }, 'Toggle')
            : null,
        ]
      ),
      open
        ? React.createElement(
            'ul',
            { key: 'rows' },
            (section.rows || []).map((r, idx) => React.createElement('li', { key: `${section.id}-${idx}` }, `${r.label}`))
          )
        : null,
      typeof section.total !== 'undefined'
        ? React.createElement('div', { key: 'total' }, formatCurrency(section.total))
        : null,
    ]
  );
}

function ReportBlock(props) {
  const { title, period, sections, totals, wireframe_metadata } = props || {};
  const collapsible = !!(wireframe_metadata && wireframe_metadata.collapsible_sections);
  const currency = (totals && totals.currency) || 'USD';

  return React.createElement(
    'div',
    { 'data-testid': 'report-block' },
    [
      title ? React.createElement('h2', { key: 'title' }, title) : null,
      period ? React.createElement('div', { key: 'period' }, period) : null,
      Array.isArray(sections)
        ? sections.map((s) => React.createElement(ReportSection, { key: s.id, section: s, collapsible }))
        : null,
      totals && typeof totals.net_profit !== 'undefined'
        ? React.createElement('div', { key: 'totals' }, formatCurrency(totals.net_profit, currency))
        : null,
    ]
  );
}

module.exports = { ReportBlock, ReportSection };
module.exports.default = ReportBlock;
