import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import WireframeTile from '@/components/wireframe/WireframeTile';

// Snapshot-based visual regression scaffold (lightweight placeholder)
describe('WireframeTile visual snapshot', () => {
  it('renders consistent structure', () => {
  const { container } = render(<WireframeTile kind="report" title="Demo" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
