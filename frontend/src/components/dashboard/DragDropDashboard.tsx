"use client";
import React from 'react';
// Reuse the already-tested Dashboard implementation (CommonJS/JS module)
// Import via require and cast to a React component to satisfy TS
// eslint-disable-next-line @typescript-eslint/no-var-requires
const DashboardModule = require('./Dashboard.js') as { default: React.ComponentType<any> };
const DashboardJS = DashboardModule.default as React.ComponentType<any>;

export type Widget = { id: string; type: string; [key: string]: unknown };
export type DashboardLayout = { widgets: Widget[]; [key: string]: unknown };

export type DragDropDashboardProps = {
  layout: DashboardLayout;
  autoSaveDelay?: number;
  onLayoutChange?: (layout: DashboardLayout) => void;
  onPersist?: (layout: DashboardLayout) => void;
};

export const DragDropDashboard: React.FC<DragDropDashboardProps> = (props) => <DashboardJS {...props} />;

export default DragDropDashboard;
