import { createBrowserRouter } from 'react-router-dom'

import Root from '@/Root'
import type { CustomRouteObject } from '@/types'

const routes: CustomRouteObject[] = [
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
            meta: {
              title: '首页'
            }
          },
          { path: '*', element: <>404</> }
        ]
      },
      {
        path: '/',
        Component: AuthLayout,
        children: [
          {
            path: '/login',
            lazy: () => import('@/pages/login'),
            meta: {
              title: '登录'
            }
          },
          {
            path: '/signup',
            lazy: () => import('@/pages/signup'),
            meta: {
              title: '注册'
            }
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

export default router
