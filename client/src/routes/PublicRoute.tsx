import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useRedirect from '../hooks/useRedirect'
import { getUser } from '../lib/user'

const PublicRoute = () => {
  const redirect = useRedirect()
  const user = getUser()

  useEffect(() => {
    if (!user) return
    redirect()
  }, [user, redirect])

  if (user) return null

  return <Outlet />
}

export default PublicRoute
