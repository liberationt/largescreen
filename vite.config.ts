
import type { UserConfig, ConfigEnv,loadEnv } from 'vite';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
//https://github.com/element-plus/unplugin-element-plus/blob/HEAD/README.zh-CN.md
import ElementPlus from 'unplugin-element-plus/vite'
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  // let BASE_API = loadEnv(mode, process.cwd())

  // const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus({
      // useSource: true
    })
    ],
    publicDir: "public",
    base: "./",
    server: {
      host: '0.0.0.0',
      port: 8112,
      open: false,
      strictPort: false,
      // proxy: {
      //   // detail: https://cli.vuejs.org/config/#devserver-proxy
      //   [BASE_API.VITE_BASE_API]: {
      //     target: process.env.VUE_APP_BASE_URL,
      //     changeOrigin: true,
      //     ws: true,
      //     rewrite: (path) => path.replace(new RegExp(`^${BASE_API.VITE_BASE_API}`), '')
      //   }
      // },
      // proxy: {}
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        "components": resolve(__dirname, "./src/components"),
        "api": resolve(__dirname, "./src/api"),
      },
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          // charset: false,
          additionalData: `@use "./src/assets/css/variable.scss" as *;`,
        },
      },
    },
    build: {
      outDir: 'dist',
    },
  }

})