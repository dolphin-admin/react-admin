import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider, theme as Theme } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import router from '@/router'

export default function App() {
  const [queryClient] = useState(() => new QueryClient())

  const { theme } = useThemeStore()

  useEffect(() => {
    ThemeUtils.changeThemeMode(theme)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <StyleProvider hashPriority="high">
        <ConfigProvider
          locale={zhCN}
          theme={{
            algorithm:
              theme === 'light' ? Theme.defaultAlgorithm : Theme.darkAlgorithm
          }}
        >
          <RouterProvider router={createBrowserRouter(router)} />
        </ConfigProvider>
      </StyleProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
