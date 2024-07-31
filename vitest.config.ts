import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

// eslint-disable-next-line no-restricted-exports
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'jsdom',
  },
});
