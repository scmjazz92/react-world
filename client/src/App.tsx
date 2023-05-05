import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes/routes'

const App = () => {
  const pages = useRoutes(routes)

  return <Suspense>{pages}</Suspense>
}

export default App
