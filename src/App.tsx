import './App.scss'
import 'nprogress/nprogress.css'

import { px2remTransformer, StyleProvider } from '@ant-design/cssinjs'
import { HappyProvider } from '@ant-design/happy-work-theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'

import router from '@/router'

import { messageConfig } from './constants'

/**
 * rem 适配
 * @see https://ant-design.antgroup.com/docs/react/compatible-style#rem-adaptation
 */
const px2rem = px2remTransformer({
  rootValue: 16,
  mediaQuery: true
})

// 静态方法的全局配置
AMessage.config(messageConfig)

export default function App() {
  const themeStore = useThemeStore()
  const langStore = useLangStore()

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 10, // 10s
            gcTime: 1000 * 60 * 5, // 5min
            retry: 1 // 失败重试次数
          }
        }
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {/**
       * antd 样式兼容
       * @see https://ant-design.antgroup.com/docs/react/compatible-style-cn
       */}

      <AConfigProvider
        locale={langStore.locale}
        theme={{
          ...(themeStore.isLightTheme() ? themeStore.lightThemeConfig : themeStore.darkThemeConfig)
        }}
      >
        <StyleProvider
          hashPriority="high"
          transformers={[px2rem]}
        >
          <AApp message={messageConfig}>
            <HappyProvider disabled={false}>
              <RouterProvider router={router} />
              <DpDevMenuFab />
            </HappyProvider>
          </AApp>
        </StyleProvider>
      </AConfigProvider>
      <ReactQueryDevtools
        initialIsOpen={themeStore.enableHappyWorkTheme}
        buttonPosition="bottom-right"
      />
    </QueryClientProvider>
  )
}
