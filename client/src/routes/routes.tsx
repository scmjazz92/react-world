import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const Main = lazy(() => import('../pages/index'))

const routes: RouteObject[] = [{ path: '/', element: <Main /> }]

export default routes
