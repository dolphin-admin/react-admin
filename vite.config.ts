import { fileURLToPath, URL } from 'node:url'

import { antdIconsPreset, antdPreset, dolphinAdminPresets } from '@dolphin-admin/auto-import'
import { BootstrapAnimation } from '@dolphin-admin/bootstrap-animation'
import react from '@vitejs/plugin-react-swc'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import type { ProxyOptions } from 'vite'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const {
    VITE_PORT,
    VITE_BASE_API_PREFIX,
    VITE_BASE_API_URL,
    VITE_MOCK_API_PREFIX,
    VITE_MOCK_API_URL
  } = env as ImportMetaEnv

  const port = parseInt(VITE_PORT, 10) || 5173
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
      react(),
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
            imports: ['useQueryClient', 'useQuery', 'useMutation']
          },
          {
            from: 'clsx',
            imports: [['default', 'clsx']]
          },
          {
            from: 'react',
            imports: ['Suspense']
          },
          {
            from: '@iconify/react',
            imports: ['Icon']
          },
          {
            from: '@/constants',
            imports: ['AppMetadata', 'GlobalEnvConfig', 'BasePageModel']
          },
          {
            from: '@/i18n',
            imports: [['default', 'i18n']]
          },
          antdPreset({ prefix: 'A' }),
          antdIconsPreset(),
          ...dolphinAdminPresets,
          {
            from: 'antd',
            imports: [['Image', 'AImage']]
          }
        ],
        dirs: [
          'src/api/**',
          'src/components/**',
          'src/hooks/**',
          'src/layouts/**',
          'src/providers/**',
          'src/store/**',
          'src/utils/**'
        ]
      }),
      Icons({
        autoInstall: true,
        compiler: 'jsx',
        jsx: 'react'
      }),
      BootstrapAnimation()
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
      // Tauri 在 Windows 上使用 Chromium，在 macOS 和 Linux 上使用 WebKit
      target: process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'safari13',
      // 调试构建时禁用压缩
      minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
      // 为调试构建生成源代码映射 (sourcemap)
      sourcemap: !!process.env.TAURI_DEBUG
    }
  }
})
