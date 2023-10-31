import './App.scss'

import { StyleProvider } from '@ant-design/cssinjs'
import { HappyProvider } from '@ant-design/happy-work-theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import zhCN from 'antd/locale/zh_CN'
import { RouterProvider } from 'react-router-dom'

import router from '@/router'

export default function App() {
  const { theme } = useThemeStore()

  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    ThemeUtils.changeThemeMode(theme)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <StyleProvider hashPriority="high">
        <AConfigProvider
          locale={zhCN}
          theme={{
            algorithm:
              theme === 'light'
                ? AntdTheme.defaultAlgorithm
                : AntdTheme.darkAlgorithm,
            token: {
              fontFamily:
                'Nunito, Noto Sans SC, system-ui, -apple-system, Roboto, Helvetica Neue, Arial, sans-serif'
            }
          }}
        >
          <AntdApp
            message={{
              maxCount: 3,
              duration: 0
            }}
          >
            <HappyProvider>
              <RouterProvider router={router} />
            </HappyProvider>
          </AntdApp>
        </AConfigProvider>
      </StyleProvider>
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition="bottom-right"
      />
    </QueryClientProvider>
  )
}
