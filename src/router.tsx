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
        lazy={() => import('@/pages/Navigation')}
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
        lazy={() => import('@/pages/Auth/Login')}
      />
      <Route
        path="/signup"
        lazy={() => import('@/pages/Auth/Signup')}
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
