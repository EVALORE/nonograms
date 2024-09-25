import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// eslint-disable-next-line no-restricted-exports
export default defineConfig({
  plugins: [tsconfigPaths()],
  build: {
    sourcemap: true,
  },
});
