import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const Main = lazy(() => import('../pages/index'))
const Register = lazy(() => import('../pages/register/index'))
const Login = lazy(() => import('../pages/login/index'))
const Write = lazy(() => import('../pages/write/index'))

const ProtectedRoute = lazy(() => import('../routes/ProtectedRoute'))
const PublicRoute = lazy(() => import('../routes/PublicRoute'))

const protedRoute: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [{ path: '/write', element: <Write /> }],
  },
]

const publicRoute: RouteObject[] = [
  {
    element: <PublicRoute />,
    children: [
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
    ],
  },
]

const routes: RouteObject[] = [
  { path: '/', element: <Main /> },
  ...protedRoute,
  ...publicRoute,
]

export default routes
