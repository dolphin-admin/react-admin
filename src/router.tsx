import { createRoutesFromElements, Route } from 'react-router-dom'
import NotFound from '@/pages/404'

const router = createRoutesFromElements(
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
      lazy={() => import('./pages/index')}
    />
    <Route
      path="/store"
      lazy={() => import('./pages/store')}
    />
    <Route
      path="/react-query"
      lazy={() => import('./pages/react-query')}
    />
    <Route
      path="*"
      element={<NotFound />}
    />
  </Route>
)

export default router
