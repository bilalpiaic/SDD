"use client";
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import DragDropDashboard, { type DashboardLayout } from '@/components/dashboard/DragDropDashboard';
import { getSessionId } from '@/utils/session';
import { fetchDashboardLayout, saveDashboardLayout } from '@/services/dashboard';

export default function DashboardPage() {
  const [layout, setLayout] = React.useState<DashboardLayout>({ widgets: [
    { id: 'w1', type: 'Metric' },
    { id: 'w2', type: 'Report' },
    { id: 'w3', type: 'Action' },
  ] });
  const layoutId = 'default';
  const sessionId = getSessionId();

  // Load persisted layout once on mount
  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const saved = await fetchDashboardLayout(layoutId);
        if (mounted && saved) setLayout(saved);
      } catch (err) {
        // Ignore if backend not available or layout missing
        console.warn('Failed to load dashboard layout:', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <MainLayout>
      <h1 className="text-xl font-semibold mb-4">Dashboard</h1>
      {/* Drag-and-drop dashboard grid */}
      <DragDropDashboard
        layout={layout}
        autoSaveDelay={0}
        onLayoutChange={(l) => setLayout(l)}
        onPersist={async (l) => {
          try {
            const saved = await saveDashboardLayout(layoutId, sessionId, l);
            setLayout(saved);
          } catch (err) {
            console.warn('Failed to save dashboard layout:', err);
          }
        }}
      />
    </MainLayout>
  );
}
