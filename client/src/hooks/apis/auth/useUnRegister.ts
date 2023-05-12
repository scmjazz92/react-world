import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { CustomMutationOptions } from '../../../lib/types'
import Auth from '../../../apis/auth'
import storage, { storageKeys } from '../../../lib/storage'

const useUnRegister = (
  options: CustomMutationOptions<typeof Auth.unRegister> = {},
) => {
  return useMutation(Auth.unRegister, {
    ...options,
    onSuccess() {
      storage.remove(storageKeys.access_token)
      storage.remove(storageKeys.refresh_token)
    },
  })
}

export default useUnRegister
