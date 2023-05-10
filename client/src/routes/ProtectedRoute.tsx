import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userState } from '../recoils/user'

const ProtectedRoute = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const currentUser = useRecoilValue(userState)

  useEffect(() => {
    if (!currentUser) {
      navigate(`/auth/login?next=${pathname}`, { replace: true })
    }
  }, [currentUser])

  if (!currentUser) return null

  return <Outlet />
}

export default ProtectedRoute
