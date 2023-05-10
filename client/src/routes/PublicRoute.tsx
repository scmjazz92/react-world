import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import useRedirect from '../hooks/useRedirect'
import { userState } from '../recoils/user'

const PublicRoute = () => {
  const redirect = useRedirect()
  const currentUser = useRecoilValue(userState)

  useEffect(() => {
    if (!currentUser) return
    redirect()
  }, [currentUser, redirect])

  if (currentUser) return null

  return <Outlet />
}

export default PublicRoute
