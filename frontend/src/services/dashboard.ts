import { api } from '@/services/api';
import type { DashboardLayout, Widget } from '@/components/dashboard/DragDropDashboard';

// Backend DTOs
export type BackendDashboardLayout = {
  layout_id: string;
  session_id: string;
  grid_configuration: Array<Record<string, any>>;
  preferences?: Record<string, any>;
  is_default: boolean;
};

function toFrontendLayout(back?: BackendDashboardLayout | null): DashboardLayout | null {
  if (!back || (back as any).detail) return null;
  const widgets: Widget[] = (back.grid_configuration || []).map((w, idx) => ({
    // Preserve any additional metadata first, then ensure id/type keys exist
    ...w,
    id: (w.id as string) || (w as any).widget_id || `w${idx + 1}`,
    type: (w.type as string) || (w as any).kind || 'Widget',
  }));
  return { widgets } as DashboardLayout;
}

function toBackendLayout(layoutId: string, sessionId: string, front: DashboardLayout): BackendDashboardLayout {
  const grid_configuration = (front.widgets || []).map((w, idx) => ({
    // Spread widget first to avoid duplicate keys, then add ordering
    ...w,
    order: idx,
  }));
  return {
    layout_id: layoutId,
    session_id: sessionId,
    grid_configuration,
    preferences: { version: 1 },
    is_default: true,
  };
}

export async function fetchDashboardLayout(layoutId: string): Promise<DashboardLayout | null> {
  const data = await api.get<BackendDashboardLayout | { detail: string }>(`/api/v1/dashboard/layout/${layoutId}`);
  return toFrontendLayout(data as BackendDashboardLayout);
}

export async function saveDashboardLayout(layoutId: string, sessionId: string, layout: DashboardLayout): Promise<DashboardLayout> {
  const payload = toBackendLayout(layoutId, sessionId, layout);
  const saved = await api.post<BackendDashboardLayout>(`/api/v1/dashboard/layout`, payload);
  return toFrontendLayout(saved)!;
}

export const dashboardApi = { fetchDashboardLayout, saveDashboardLayout };
