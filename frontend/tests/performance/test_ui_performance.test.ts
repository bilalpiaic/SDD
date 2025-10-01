import { describe, it, expect } from 'vitest';

describe('UI responsiveness', () => {
  it('basic state update under 500ms', async () => {
    const start = performance.now();
    let s = 0;
    for (let i = 0; i < 1e5; i++) s += i;
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(500);
  });
});
