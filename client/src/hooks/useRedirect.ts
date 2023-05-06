import React, { useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const useRedirect = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const next = searchParams.get('next') ?? '/'

  const redirect = useCallback(() => {
    navigate(next)
  }, [next, navigate])

  return redirect
}

export default useRedirect
