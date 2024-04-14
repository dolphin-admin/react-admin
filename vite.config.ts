import { fileURLToPath, URL } from 'node:url'

import { dolphinAdminPresets } from '@dolphin-admin/auto-import'
import { BootstrapAnimation } from '@dolphin-admin/bootstrap-animation'
import ReactSWC from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import AhooksResolver from 'unplugin-auto-import-ahooks'
import AntdResolver from 'unplugin-auto-import-antd'
import Icons from 'unplugin-icons/vite'
import Info from 'unplugin-info/vite'
import type { ProxyOptions } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import ViteCompression from 'vite-plugin-compression'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()) as ImportMetaEnv
  const {
    VITE_PORT,
    VITE_BASE_API_PREFIX,
    VITE_BASE_API_URL,
    VITE_MOCK_API_PREFIX,
    VITE_MOCK_API_URL
  } = env

  const port = Number.parseInt(VITE_PORT, 10) || 5173
  const proxy: Record<string, string | ProxyOptions> = {
    [VITE_BASE_API_PREFIX]: {
      target: VITE_BASE_API_URL,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(VITE_BASE_API_PREFIX, '')
    },
    [VITE_MOCK_API_PREFIX]: {
      target: VITE_MOCK_API_URL,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(VITE_MOCK_API_PREFIX, '')
    },
    '/socket.io': {
      target: VITE_BASE_API_URL,
      ws: true,
      changeOrigin: true
    }
  }

  return {
    base: '/',
    plugins: [
      ReactSWC(),
      AutoImport({
        dts: '@types/auto-imports.d.ts',
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.md$/ // .md
        ],
        imports: [
          'react',
          'react-router-dom',
          'react-i18next',
          {
            from: '@tanstack/react-query',
            imports: ['useQueryClient', 'useQuery', 'useQueries', 'useMutation', 'keepPreviousData']
          },
          { from: 'clsx', imports: [['default', 'clsx']] },
          { from: 'react', imports: ['Suspense'] },
          { from: 'use-immer', imports: ['useImmer'] },
          { from: '@iconify/react', imports: ['Icon'] },
          { from: '@ant-design/icons', imports: [['default', 'AIcon']] },
          { from: '@/constants', imports: ['AppMetadata', 'GlobalEnvConfig', 'BasePageModel'] },
          { from: '@/i18n', imports: [['default', 'i18n']] },
          ...dolphinAdminPresets
        ],
        resolvers: [AntdResolver({ prefix: 'A' }), AhooksResolver()],
        dirs: [
          'src/api/**',
          'src/components/**',
          'src/hooks/**',
          'src/layouts/*/index.tsx',
          'src/providers/**',
          'src/store/**'
        ]
      }),
      Icons({
        autoInstall: true,
        compiler: 'jsx',
        jsx: 'react'
      }),
      ViteCompression({
        verbose: true, // 是否在控制台中输出压缩结果
        disable: true,
        threshold: 10240, // 体积过小时不压缩
        algorithm: 'gzip', // 压缩算法
        ext: '.gz',
        deleteOriginFile: true // 源文件压缩后是否删除
      }),
      visualizer({ open: false, gzipSize: true }),
      BootstrapAnimation(),
      Info()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : []
    },
    server: {
      host: true,
      port,
      strictPort: true,
      open: false,
      proxy
    },
    preview: {
      host: true,
      port,
      strictPort: true,
      open: false,
      proxy
    },
    /**
     * Tauri 相关配置
     * @see https://tauri.app/zh-cn/v1/guides/getting-started/setup/vite
     */
    clearScreen: false,
    envPrefix: [
      'VITE_',
      'TAURI_PLATFORM',
      'TAURI_ARCH',
      'TAURI_FAMILY',
      'TAURI_PLATFORM_VERSION',
      'TAURI_PLATFORM_TYPE',
      'TAURI_DEBUG'
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            axios: ['axios'],
            antd: ['antd'],
            'lodash-es': ['lodash-es']
          }
        }
      },
      // Tauri 在 Windows 上使用 Chromium，在 macOS 和 Linux 上使用 WebKit
      target: process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'esnext',
      // 调试构建时禁用压缩
      minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
      // 为调试构建生成源代码映射 (sourcemap)
      sourcemap: !!process.env.TAURI_DEBUG
    }
  }
})
