import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import url from "url";
import path, { dirname } from "path";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@common": path.resolve(__dirname, "../../common"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000,
    inline: false,
    host: '0.0.0.0',
    proxy: {
      "/api": {
        target: "https://open.datadex.com.cn/dexserver/dex-api/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    minify: "terser",
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  }
})
