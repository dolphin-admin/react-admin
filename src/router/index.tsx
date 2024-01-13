import { createBrowserRouter } from 'react-router-dom'

import Root from '@/Root'
import type { CustomRouteObject, RouteMetadata } from '@/types'

const t = i18n.getFixedT(null, 'MENU')

export const routes: CustomRouteObject[] = [
  {
    path: '/',
    Component: Root,
    children: [
      {
        path: '/',
        Component: DpBaseLayout,
        children: [
          {
            index: true,
            lazy: () => import('@/pages'),
            meta: { title: () => t('HOME') }
          },
          {
            path: '/system/dictionaries',
            lazy: () => import('@/pages/system/dictionaries'),
            meta: { title: () => t('DICTIONARY.MANAGEMENT'), icon: 'Dictionary' }
          },
          {
            path: '/resources/locales',
            lazy: () => import('@/pages/resources/locales'),
            meta: { title: () => t('LOCALES.MANAGEMENT'), icon: 'Lang' }
          },
          {
            path: '/code-templates/table',
            lazy: () => import('@/pages/code-templates/table'),
            meta: { title: () => t('CODE.TEMPLATES.TABLE'), icon: 'Table' }
          },
          {
            path: '/code-templates/card',
            lazy: () => import('@/pages/code-templates/card'),
            meta: { title: () => t('CODE.TEMPLATES.CARD'), icon: 'Books' }
          },
          {
            path: '/code-templates/two-col',
            lazy: () => import('@/pages/code-templates/two-col'),
            meta: { title: () => t('CODE.TEMPLATES.TWO.COL') }
          },
          {
            path: '/multi-level-menus/2-1/2-1-1',
            lazy: () => import('@/pages/multi-level-menus/2-1/2-1-1'),
            meta: { title: '2-1-1', icon: 'Menu' }
          },
          {
            path: '/multi-level-menus/2-1/2-1-2',
            lazy: () => import('@/pages/multi-level-menus/2-1/2-1-2'),
            meta: { title: '2-1-2', icon: 'Menu' }
          },
          {
            path: '/multi-level-menus/2-2',
            lazy: () => import('@/pages/multi-level-menus/2-2'),
            meta: { title: '2-2', icon: 'Menu' }
          },
          {
            path: '/error-pages/403',
            lazy: () => import('@/pages/error-pages/403'),
            meta: { title: '403', icon: '403' }
          },
          {
            path: '/error-pages/404',
            lazy: () => import('@/pages/error-pages/404'),
            meta: { title: '404', icon: '404' }
          },
          {
            path: '/error-pages/418',
            lazy: () => import('@/pages/error-pages/418'),
            meta: { title: '418', icon: '418' }
          },
          {
            path: '/error-pages/500',
            lazy: () => import('@/pages/error-pages/500'),
            meta: { title: '500', icon: '500' }
          },
          {
            path: '*',
            lazy: () => import('@/pages/error-pages/404'),
            meta: { title: '404', icon: '404' }
          }
        ]
      },
      {
        path: '/',
        Component: DpAuthLayout,
        children: [
          {
            path: '/login',
            lazy: () => import('@/pages/login'),
            meta: { title: () => t('LOGIN') }
          },
          {
            path: '/signup',
            lazy: () => import('@/pages/signup'),
            meta: { title: () => t('SIGN.UP') }
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
