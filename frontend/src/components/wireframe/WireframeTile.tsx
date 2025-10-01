import React from 'react';

export type MetricData = {
  current_value?: number;
  change_amount?: number;
  change_percentage?: number;
  period?: string;
  trend?: 'up' | 'down' | 'flat' | string;
  currency?: string;
};

export type ReportData = {
  report_type?: string;
  period?: string;
  total_revenue?: number;
  total_expenses?: number;
  net_profit?: number;
  profit_margin?: number;
  currency?: string;
};

export type WireframeTileProps = (
  | {
      kind: 'metric';
      title?: string;
      data?: MetricData;
    }
  | {
      kind: 'report';
      id?: string;
      title?: string;
      data?: ReportData;
      mcp_source?: { params?: Record<string, unknown> };
      onExpand?: (payload: { tileId?: string; reportType?: string; fullReportParams: Record<string, unknown> }) => void;
    }
);

function formatCurrency(value: number | undefined, currency = 'USD'): string {
  if (typeof value !== 'number') return '';
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
  } catch {
    return String(value);
  }
}

export const WireframeTile: React.FC<WireframeTileProps> = (props) => {
  if (props.kind === 'metric') {
    const { title, data } = props;
    const trend = data?.trend;
    const currency = data?.currency || 'USD';
    const changeSign = typeof data?.change_amount === 'number' && data.change_amount > 0 ? '+' : '';
    const percentSign = typeof data?.change_percentage === 'number' && data.change_percentage > 0 ? '+' : '';
    return (
      <div data-testid="wireframe-tile-metric">
        {title && <div>{title}</div>}
        {typeof data?.current_value !== 'undefined' && <div>{formatCurrency(data.current_value, currency)}</div>}
        {typeof data?.change_amount !== 'undefined' && <div>{`${changeSign}${formatCurrency(data.change_amount, currency)}`}</div>}
        {typeof data?.change_percentage !== 'undefined' && <div>{`${percentSign}${data.change_percentage}%`}</div>}
        {data?.period && <div>{data.period}</div>}
        <div data-testid={trend ? `trend-${trend}` : 'trend-unknown'} />
        <div data-testid="metric-value" className={trend ? `${trend}-trend` : undefined} />
      </div>
    );
  }

  const { title, data, onExpand, mcp_source } = props;
  const currency = data?.currency || 'USD';
  const handleExpand = () => {
    if (onExpand && data) {
      onExpand({ tileId: (props as any).id, reportType: data.report_type, fullReportParams: (mcp_source?.params as any) || {} });
    }
  };
  return (
    <div data-testid="wireframe-tile-report">
      {title && <div>{title}</div>}
      {data?.period && <div>{data.period}</div>}
      {typeof data?.total_revenue !== 'undefined' && <div>{formatCurrency(data.total_revenue, currency)}</div>}
      {typeof data?.total_expenses !== 'undefined' && <div>{formatCurrency(data.total_expenses, currency)}</div>}
      {typeof data?.net_profit !== 'undefined' && <div>{formatCurrency(data.net_profit, currency)}</div>}
      {typeof data?.profit_margin !== 'undefined' && <div>{`${data.profit_margin}%`}</div>}
      <div data-testid="mini-chart" />
      <button data-testid="expand-button" onClick={handleExpand}>Expand</button>
    </div>
  );
};

export default WireframeTile;
