export function reorder<T>(list: T[], fromIdx: number, toIdx: number): T[] {
  const copy = list.slice();
  const [moved] = copy.splice(fromIdx, 1);
  copy.splice(toIdx, 0, moved);
  return copy;
}

export function getDragData(e: DragEvent | any, key = 'text/plain'): string | null {
  const dt = (e && (e.dataTransfer || (e.nativeEvent && e.nativeEvent.dataTransfer))) as DataTransfer | undefined;
  if (dt && typeof dt.getData === 'function') {
    try { return dt.getData(key); } catch { return null; }
  }
  return null;
}

export function setDragData(e: DragEvent | any, data: string, key = 'text/plain'): void {
  const dt = (e && (e.dataTransfer || (e.nativeEvent && e.nativeEvent.dataTransfer))) as DataTransfer | undefined;
  if (dt && typeof dt.setData === 'function') {
    try { dt.setData(key, data); } catch { /* noop */ }
  }
}
