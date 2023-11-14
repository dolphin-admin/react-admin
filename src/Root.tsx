import nprogress from 'nprogress'
import { useNavigation } from 'react-router-dom'

nprogress.configure({ showSpinner: false })

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

  useEffect(() => {
    if (navigation.state === 'loading') {
      nprogress.start()
    } else {
      nprogress.done()
    }
  }, [navigation.state])

  return <Outlet />
}
