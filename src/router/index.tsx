import { createBrowserRouter } from 'react-router-dom'

import Root from '@/Root'

/**
 * @see {@link https://github.com/remix-run/react-router/discussions/9915}
 */
const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        path: '/',
        Component: BaseLayout,
        children: [
          { path: '/', lazy: () => import('@/pages') },
          { path: '*', element: <>404</> }
        ]
      },
      {
        path: '/',
        Component: AuthLayout,
        children: [
          { path: '/login', lazy: () => import('@/pages/login') },
          { path: '/signup', lazy: () => import('@/pages/signup') }
        ]
      }
    ]
  }
])

export default router
