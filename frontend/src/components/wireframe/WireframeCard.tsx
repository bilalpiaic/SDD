import React from 'react';

export type WireframeCardProps = {
  title?: string;
  subtitle?: string;
  items?: Array<{ label: string; value: string | number }>;
  chart?: { type: 'bar' | 'line' | 'area' | string; data?: unknown };
  footer?: React.ReactNode;
};

export const WireframeCard: React.FC<WireframeCardProps> = ({ title, subtitle, items, chart, footer }) => {
  return (
    <div data-testid="wireframe-card">
      {title && <div data-testid="card-title">{title}</div>}
      {subtitle && <div data-testid="card-subtitle">{subtitle}</div>}
      {items?.length ? (
        <ul data-testid="card-list">
          {items.map((it, idx) => (
            <li key={idx} data-testid="card-list-item">
              <span>{it.label}</span>
              <span>{String(it.value)}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {chart ? <div data-testid={`card-chart-${chart.type}`}></div> : null}
      {footer ? <div data-testid="card-footer">{footer}</div> : null}
    </div>
  );
};

export default WireframeCard;
