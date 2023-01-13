import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    base: '/vgm-quiz/',
    rollupOptions: {
        input: {
            main: resolve(__dirname, 'index.html'),
        },
    },
});
