import { defineConfig } from 'vitest/config';
import path from 'path';

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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup/vitest.setup.ts'],
    css: false,
    include: [
      'tests/**/*.test.jsx',
      'tests/**/*.test.tsx',
      'tests/**/*.test.ts',
    ],
    reporters: ['basic'],
    coverage: { enabled: false }
  }
});
