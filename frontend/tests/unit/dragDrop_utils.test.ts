import { describe, it, expect } from 'vitest';
import { reorder, getDragData, setDragData } from '@/utils/dragDrop';

describe('dragDrop utils', () => {
  it('reorder moves an item', () => {
    const arr = ['a', 'b', 'c'];
    const out = reorder(arr, 0, 2);
    expect(out).toEqual(['b', 'c', 'a']);
    expect(arr).toEqual(['a', 'b', 'c']);
  });

  it('get/setDragData works with stub DataTransfer', () => {
    let store: Record<string, string> = {};
    const e: any = { dataTransfer: { getData: (k: string) => store[k] || '', setData: (k: string, v: string) => { store[k] = v; } } };
    setDragData(e, 'VALUE', 'foo');
    expect(getDragData(e, 'foo')).toBe('VALUE');
  });
});
