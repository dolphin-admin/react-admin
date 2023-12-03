import { getRouteMetadata, routes } from '@/router'
import type { RouteMetadata } from '@/types'

interface RouteMetaAction {
  getTitle: () => string | undefined
}

// 获取当前路由的元数据
export const useRouteMeta = (): RouteMetadata & RouteMetaAction => {
  const location = useLocation()

  const routeMeta = useMemo(
    () => getRouteMetadata(location.pathname, routes) ?? {},
    [location.pathname]
  )

  /**
   * 获取路由标题
   * @description `title` 可能函数或字符串，需要处理
   */
  const getTitle = () =>
    typeof routeMeta.title === 'function' ? routeMeta.title() : routeMeta.title

  return { ...routeMeta, getTitle }
}
