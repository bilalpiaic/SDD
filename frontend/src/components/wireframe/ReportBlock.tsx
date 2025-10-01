import React from 'react';

export type ReportRow = Record<string, string | number | null | undefined>;

export type ReportBlockProps = {
  title?: string;
  columns?: string[];
  rows?: ReportRow[];
  filters?: Record<string, unknown>;
  onFilterChange?: (filters: Record<string, unknown>) => void;
};

export const ReportBlock: React.FC<ReportBlockProps> = ({ title, columns, rows, filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = React.useState<Record<string, unknown>>(filters || {});

  const handleChange = (key: string, value: unknown) => {
    const next = { ...localFilters, [key]: value };
    setLocalFilters(next);
    onFilterChange?.(next);
  };

  return (
    <div data-testid="report-block">
      {title && <h3>{title}</h3>}
      {columns?.length ? (
        <table>
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(rows || []).map((r, i) => (
              <tr key={i} data-testid="report-row">
                {columns.map((c) => (
                  <td key={c}>{r[c] as React.ReactNode}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div data-testid="report-empty">No data</div>
      )}
      {/* Simple filter slot (extensible) */}
      <div data-testid="report-filters">
        {Object.keys(localFilters).map((k) => (
          <button key={k} onClick={() => handleChange(k, undefined)}>
            Clear {k}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReportBlock;
