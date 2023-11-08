import './App.scss'

import { StyleProvider } from '@ant-design/cssinjs'
import { HappyProvider } from '@ant-design/happy-work-theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import zhCN from 'antd/locale/zh_CN'
import { RouterProvider } from 'react-router-dom'

import router from '@/router'

import { themeToken } from './constants'

export default function App() {
  const { theme, enableHappyWorkTheme } = useThemeStore()

  const [queryClient] = useState(() => new QueryClient())

  return (
    <div className="select-none">
      <QueryClientProvider client={queryClient}>
        {/**
         * antd 样式兼容
         * @see https://ant-design.antgroup.com/docs/react/compatible-style-cn
         */}
        <StyleProvider hashPriority="high">
          <AConfigProvider
            locale={zhCN}
            theme={{
              algorithm: theme === 'light' ? AntdTheme.defaultAlgorithm : AntdTheme.darkAlgorithm,
              token: themeToken
            }}
          >
            <AntdApp message={{ maxCount: 3, duration: 3 }}>
              <HappyProvider disabled={false}>
                <RouterProvider router={router} />
              </HappyProvider>
            </AntdApp>
          </AConfigProvider>
        </StyleProvider>
        <ReactQueryDevtools
          initialIsOpen={enableHappyWorkTheme}
          buttonPosition="bottom-right"
        />
      </QueryClientProvider>
    </div>
  )
}
