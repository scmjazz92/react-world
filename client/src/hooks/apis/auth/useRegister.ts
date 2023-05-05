import { useMutation } from '@tanstack/react-query'
import React from 'react'
import storage, { storageKeys } from '../../../lib/storage'
import { CustomMutationOptions } from '../../../lib/types'
import Auth from '../../../apis/auth'

const useRegister = (
  options: CustomMutationOptions<typeof Auth.register> = {},
) => {
  return useMutation(Auth.register, {
    ...options,
    onSuccess({ tokens }) {
      storage.set(storageKeys.access_token, tokens.access_token)
      storage.set(storageKeys.refresh_token, tokens.refresh_token)
    },
  })
}

export default useRegister
