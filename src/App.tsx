import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider, theme as Theme, App as AntdApp } from 'antd'
import router from '@/router'
import { StyleProvider } from '@ant-design/cssinjs'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HappyProvider } from '@ant-design/happy-work-theme'

export default function App() {
  const [queryClient] = useState(() => new QueryClient())

  const { theme } = useThemeStore()

  useEffect(() => {
    ThemeUtils.changeThemeMode(theme)
  }, [])

  return (
    <div className="bg-layout-light text-base dark:bg-layout-dark">
      <QueryClientProvider client={queryClient}>
        <StyleProvider hashPriority="high">
          <ConfigProvider
            locale={zhCN}
            theme={{
              algorithm:
                theme === 'light'
                  ? Theme.defaultAlgorithm
                  : Theme.darkAlgorithm,
              token: {
                fontFamily:
                  'Nunito, Noto Sans, system-ui, -apple-system, Roboto, Helvetica Neue, Arial, sans-serif'
              }
            }}
          >
            <AntdApp
              message={{
                maxCount: 3,
                duration: 1
              }}
            >
              <HappyProvider>
                <RouterProvider router={createBrowserRouter(router)} />
              </HappyProvider>
            </AntdApp>
          </ConfigProvider>
        </StyleProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  )
}
