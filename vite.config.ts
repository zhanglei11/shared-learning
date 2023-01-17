import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { VITE_API_URL } from './src/config/index'
import configStyles from './src/config/styles'

export default defineConfig({
  plugins: [vue(), vueSetupExtend()],
  base: '/',
  server: {
    host: 'localhost',
    port: 8113,
    // 是否自动在浏览器打开
    open: true,
    // 是否开启 https
    https: false, //https
    hmr: {
      overlay: true //hot更新
    },
    proxy: {
      '/smart-audit/api': {
        target: `http://${VITE_API_URL}`,
        changeOrigin: true,
        secure: true,
        rewrite: (path) => {
          return path.replace('/smart-audit/api', '/smart-audit/api')
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      public: path.resolve(__dirname, './public')
    }
  },
  optimizeDeps: {
    include: ['@ant-design/icons-vue']
  },
  ...configStyles
})
