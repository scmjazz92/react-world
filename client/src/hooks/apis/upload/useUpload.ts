import { useMutation } from '@tanstack/react-query'
import React from 'react'
import Upload from '../../../apis/upload'
import { CustomMutationOptions } from '../../../lib/types'

const useUpload = (options: CustomMutationOptions<typeof Upload.file> = {}) => {
  return useMutation(Upload.file, {
    ...options,
  })
}

export default useUpload
