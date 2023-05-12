import React, { useCallback } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const useRedirect = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const next = searchParams.get('next') ?? '/'
  const nextPath = location.search.split('?next=')[1] ?? next

  const redirect = useCallback(() => {
    navigate(nextPath)
  }, [next, navigate])

  return redirect
}

export default useRedirect
