import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Prevent Vitest/Vite from loading project PostCSS config during tests
  css: {
    postcss: {
      plugins: []
    }
  },
  // Enable JSX transform without React plugin; supports JSX in .jsx/.tsx files
  esbuild: {
    jsx: 'automatic',
    jsxDev: true
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup/vitest.setup.ts'],
    css: false,
    reporters: ['basic'],
    coverage: { enabled: false }
  }
});
