import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { getUser } from '../lib/user'

const ProtectedRoute = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const user = getUser()

  useEffect(() => {
    if (!user) {
      navigate(`/auth/login?next=${pathname}`, { replace: true })
    }
  }, [user])

  if (!user) return null

  return <Outlet />
}

export default ProtectedRoute
