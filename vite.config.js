import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/likurg42-JSFE2022Q3/songbird/',
  rollupOptions: {
    input: {
      main: resolve(__dirname, 'index.html'),
    },
  },
});
