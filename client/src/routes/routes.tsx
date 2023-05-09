import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const Main = lazy(() => import('../pages/index'))
const Register = lazy(() => import('../pages/register/index'))
const Login = lazy(() => import('../pages/login/index'))
const Write = lazy(() => import('../pages/write/index'))
const WriteEdit = lazy(() => import('../pages/write/edit'))
const ArticleDetail = lazy(() => import('../pages/article/[articleId]'))

const ProtectedRoute = lazy(() => import('../routes/ProtectedRoute'))
const PublicRoute = lazy(() => import('../routes/PublicRoute'))

const protedRoute: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/write', element: <Write /> },
      { path: '/write/edit', element: <WriteEdit /> },
    ],
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
  { path: '/articles/:articleId', element: <ArticleDetail /> },
  ...protedRoute,
  ...publicRoute,
]

export default routes
