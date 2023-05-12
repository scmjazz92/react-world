import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const Main = lazy(() => import('../pages/index'))
const Register = lazy(() => import('../pages/register/index'))
const Login = lazy(() => import('../pages/login/index'))
const Write = lazy(() => import('../pages/write/index'))
const WriteEdit = lazy(() => import('../pages/write/edit'))
const ArticleDetail = lazy(() => import('../pages/article/[articleId]'))
const Search = lazy(() => import('../pages/search/index'))
const Setting = lazy(() => import('../pages/setting/index'))
const MyPage = lazy(() => import('../pages/setting/mypage'))
const Story = lazy(() => import('../pages/story/[username]'))

const ProtectedRoute = lazy(() => import('../routes/ProtectedRoute'))
const PublicRoute = lazy(() => import('../routes/PublicRoute'))

const protedRoute: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/write', element: <Write /> },
      { path: '/write/edit', element: <WriteEdit /> },
      { path: '/setting', element: <Setting /> },
      { path: '/setting/mypage', element: <MyPage /> },
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
  { path: '/search', element: <Search /> },
  { path: '/story/:username', element: <Story /> },
  ...protedRoute,
  ...publicRoute,
]

export default routes
