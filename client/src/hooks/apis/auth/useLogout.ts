import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useResetRecoilState } from 'recoil'
import storage, { storageKeys } from '../../../lib/storage'
import { userState } from '../../../recoils/user'

const useLogout = () => {
  const navigate = useNavigate()
  const onReset = useResetRecoilState(userState)

  const logout = () => {
    storage.remove(storageKeys.access_token)
    storage.remove(storageKeys.refresh_token)
    onReset()
    navigate('/')
  }

  return logout
}

export default useLogout
