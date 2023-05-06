import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import useRefresh from './hooks/apis/auth/useRefresh'
import routes from './routes/routes'

const App = () => {
  const pages = useRoutes(routes)
  useRefresh()

  return <Suspense>{pages}</Suspense>
}

export default App
