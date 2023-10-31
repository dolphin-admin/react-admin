import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'

const routes = createRoutesFromElements(
  <>
    <Route
      path="/"
      element={
        <NProgressProvider>
          <BaseLayout />
        </NProgressProvider>
      }
    >
      <Route
        path="/"
        lazy={() => import('@/pages')}
      />
      <Route
        path="*"
        element={<>404</>}
      />
    </Route>
    <Route
      path="/"
      element={
        <NProgressProvider>
          <AuthLayout />
        </NProgressProvider>
      }
    >
      <Route
        path="/login"
        lazy={() => import('@/pages/login')}
      />
      <Route
        path="/signup"
        lazy={() => import('@/pages/signup')}
      />
    </Route>
  </>
)

/**
 * @see https://github.com/remix-run/react-router/discussions/9915
 */
const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(routes)

export default router
