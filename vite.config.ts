import { fileURLToPath, URL } from 'node:url'

import {
  antdIconsPreset,
  antdPreset,
  dolphinAdminPresets
} from '@dolphin-admin/auto-import'
import react from '@vitejs/plugin-react-swc'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import type { ProxyOptions } from 'vite'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_PORT, VITE_BASE_API_PROXY, VITE_MOCK_API_PROXY } =
    env as ImportMetaEnv

  const port = parseInt(VITE_PORT, 10) || 5173
  const proxy: Record<string, string | ProxyOptions> = {
    '/base-api': {
      target: VITE_BASE_API_PROXY,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/base-api/, '')
    },
    '/mock-api': {
      target: VITE_MOCK_API_PROXY,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/mock-api/, '')
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
          'ahooks',
          {
            from: '@tanstack/react-query',
            imports: ['useQueryClient', 'useQuery', 'useMutation']
          },
          {
            from: 'clsx',
            imports: [['default', 'clsx']]
          },
          {
            from: '@/constants',
            imports: ['GlobalEnvConfig', 'BasePageModel', 'AppConfig']
          },
          antdPreset({ prefix: 'A' }),
          antdIconsPreset(),
          ...dolphinAdminPresets,
          {
            from: 'antd',
            imports: [
              ['Popover', 'APopover'],
              ['Dropdown', 'ADropdown'],
              ['Avatar', 'AAvatar'],
              ['Tooltip', 'ATooltip']
            ]
          }
        ],
        dirs: [
          'src/api',
          'src/components',
          'src/config',
          'src/hooks',
          'src/layouts',
          'src/providers',
          'src/store',
          'src/tools',
          'src/utils'
        ]
      }),
      Icons({
        autoInstall: true,
        compiler: 'jsx',
        jsx: 'react'
      })
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
    }
  }
})
