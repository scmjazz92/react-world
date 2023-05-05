import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const Main = lazy(() => import('../pages/index'))
const Register = lazy(() => import('../pages/register/index'))
const Login = lazy(() => import('../pages/login/index'))

const routes: RouteObject[] = [
  { path: '/', element: <Main /> },
  { path: '/auth/register', element: <Register /> },
  { path: '/auth/login', element: <Login /> },
]

export default routes
