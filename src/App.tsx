import './App.scss'
import 'nprogress/nprogress.css'

import { StyleProvider } from '@ant-design/cssinjs'
import { HappyProvider } from '@ant-design/happy-work-theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'

import router from '@/router'

import { messageConfig, themeToken } from './constants'

export default function App() {
  const themeStore = useThemeStore()
  const langStore = useLangStore()

  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {/**
       * antd 样式兼容
       * @see https://ant-design.antgroup.com/docs/react/compatible-style-cn
       */}
      <StyleProvider hashPriority="high">
        <AConfigProvider
          locale={langStore.locale}
          theme={{
            algorithm:
              themeStore.theme === 'light' ? AntdTheme.defaultAlgorithm : AntdTheme.darkAlgorithm,
            token: themeToken
          }}
        >
          <AntdApp message={{ ...messageConfig }}>
            <HappyProvider disabled={false}>
              <RouterProvider router={router} />
            </HappyProvider>
          </AntdApp>
        </AConfigProvider>
      </StyleProvider>
      <ReactQueryDevtools
        initialIsOpen={themeStore.enableHappyWorkTheme}
        buttonPosition="bottom-right"
      />
    </QueryClientProvider>
  )
}
