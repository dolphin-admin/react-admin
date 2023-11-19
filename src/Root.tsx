import nprogress from 'nprogress'
import { useNavigation } from 'react-router-dom'

import { getRouteMetadata, routes } from './router'

nprogress.configure({ showSpinner: false })

const { APP_NAME } = AppMetadata

/**
 * 生成页面标题
 * @description
 * - 如果传参，结果为 `当前页面标题 | 应用名称`
 * - 默认为 `应用名称`
 */
const getDocumentTitle = (title?: string) => (title ? `${title} | ${APP_NAME}` : APP_NAME)

/**
 * 路由根组件
 * @description 为什么要使用这个组件？
 * - 使用 React Router 的 RouterProvider 时，无法在 App 组件，即全局路由，使用 React Router 的 Hook。
 * - 但是，我们需要在全局路由中监听路由状态，以便在路由切换时，显示进度条。
 * - 这个组件目前仅用于处理 NProgress 进度条，如果有其他全局路由状态需要处理，可以在这里处理。
 * @see {@link https://reactrouter.com/en/main/upgrading/v6-data}
 */
export default function Root() {
  const navigation = useNavigation()
  const location = useLocation()

  // 监听路由变化，显示进度条
  useEffect(() => {
    if (navigation.state === 'loading') {
      nprogress.start()
    } else {
      nprogress.done()
    }
  }, [navigation.state])

  // 监听路由变化，动态修改页面标题
  useEffect(() => {
    const { title } = getRouteMetadata(location.pathname, routes) ?? {}
    document.title = getDocumentTitle(typeof title === 'function' ? title() : title)
  }, [location.pathname])

  return <Outlet />
}
