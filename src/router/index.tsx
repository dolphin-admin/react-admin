import { createBrowserRouter } from 'react-router-dom'

import Root from '@/Root'
import type { CustomRouteObject, RouteMetadata } from '@/types'

const { t } = i18n

export const routes: CustomRouteObject[] = [
  {
    path: '/',
    Component: Root,
    children: [
      {
        path: '/',
        Component: BaseLayout,
        children: [
          {
            index: true,
            lazy: () => import('@/pages'),
            meta: { title: () => t('MENU:HOME') }
          },
          {
            path: '/code-templates/table',
            lazy: () => import('@/pages/code-templates/table'),
            meta: { title: () => t('MENU:CODE.TEMPLATES.TABLE') }
          },
          {
            path: '/code-templates/card',
            lazy: () => import('@/pages/code-templates/card'),
            meta: { title: () => t('MENU:CODE.TEMPLATES.CARD') }
          },
          { path: '*', element: <>404</>, meta: { title: '404' } }
        ]
      },
      {
        path: '/',
        Component: AuthLayout,
        children: [
          {
            path: '/login',
            lazy: () => import('@/pages/login'),
            meta: { title: () => t('MENU:LOGIN') }
          },
          {
            path: '/signup',
            lazy: () => import('@/pages/signup'),
            meta: { title: () => t('MENU:SIGN.UP') }
          }
        ]
      }
    ]
  }
]

/**
 * @see {@link https://github.com/remix-run/react-router/discussions/9915}
 */
const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(routes)

// 路由元数据缓存
export const routeMetadataCacheMap = new Map<string, RouteMetadata | undefined>()

/**
 * 递归匹配获取当前路由的元数据
 * @description 先从缓存中获取，如果缓存中没有，则递归匹配，匹配到后缓存结果
 */
export function getRouteMetadata(
  path: string,
  routeList: CustomRouteObject[]
): RouteMetadata | undefined {
  // 优先从缓存中获取
  if (routeMetadataCacheMap.has(path)) {
    return routeMetadataCacheMap.get(path)
  }

  // 匹配当前路由
  const route = routeList.find((r) => r.path === path)
  if (route) {
    // 缓存结果
    routeMetadataCacheMap.set(path, route.meta)
    return route.meta
  }

  // 递归匹配子路由
  // eslint-disable-next-line no-restricted-syntax
  for (const r of routeList) {
    if (r.children) {
      const meta = getRouteMetadata(path, r.children)
      if (meta) {
        // 缓存结果
        routeMetadataCacheMap.set(path, meta)
        return meta
      }
    }
  }
  // 缓存结果
  routeMetadataCacheMap.set(path, undefined)
  return undefined
}

export default router
