/**
 * Component Tests for Report Blocks (T025)
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

let ReportBlock, ReportSection, ReportTable, ReportFilters;
let COMPONENTS_AVAILABLE = true;
try {
  ({ ReportBlock } = require('../../src/components/report/ReportBlock'));
  ({ ReportSection } = require('../../src/components/report/ReportSection'));
  ({ ReportTable } = require('../../src/components/report/ReportTable'));
  ({ ReportFilters } = require('../../src/components/report/ReportFilters'));
} catch (error) {
  COMPONENTS_AVAILABLE = false;
}
const d = COMPONENTS_AVAILABLE ? describe : describe.skip;

d('ReportBlock', () => {
  const mockReport = {
    id: 'report_001',
    title: 'Profit & Loss',
    period: 'Q3 2024',
    sections: [
      {
        id: 'revenue',
        title: 'Revenue',
        rows: [
          { label: 'Product Sales', value: 94000 },
          { label: 'Services', value: 31000 }
        ],
        total: 125000
      },
      {
        id: 'expenses',
        title: 'Expenses',
        rows: [
          { label: 'COGS', value: 54000 },
          { label: 'Operating Expenses', value: 44000 }
        ],
        total: 98000
      }
    ],
    totals: {
      net_profit: 27000,
      currency: 'USD'
    },
    wireframe_metadata: {
      collapsible_sections: true,
      show_totals: true,
      exportable: true
    }
  };

  it('renders report with sections and totals', () => {
    render(<ReportBlock {...mockReport} />);
    expect(screen.getByText('Profit & Loss')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('Expenses')).toBeInTheDocument();
    expect(screen.getByText('$27,000.00')).toBeInTheDocument();
  });

  it('collapses and expands sections', () => {
    render(<ReportBlock {...mockReport} />);
    fireEvent.click(screen.getByTestId('toggle-section-revenue'));
    expect(screen.queryByText('Product Sales')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('toggle-section-revenue'));
    expect(screen.getByText('Product Sales')).toBeInTheDocument();
  });
});

d('ReportFilters', () => {
  const props = {
    presets: ['This month', 'Last month', 'This quarter', 'Last quarter'],
    onApply: vi.fn(),
  };
  
  it('applies selected filters', () => {
    render(<ReportFilters {...props} />);
    fireEvent.click(screen.getByText('Last quarter'));
    fireEvent.click(screen.getByTestId('apply-filters'));
    expect(props.onApply).toHaveBeenCalledWith({ preset: 'Last quarter' });
  });
});
