import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { CustomMutationOptions } from '../../../lib/types'
import Auth from '../../../apis/auth'

const useChangePassword = (
  options: CustomMutationOptions<typeof Auth.changePassword> = {},
) => {
  return useMutation(Auth.changePassword, {
    ...options,
  })
}

export default useChangePassword
