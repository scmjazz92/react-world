import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { CustomMutationOptions } from '../../../lib/types'
import Article from '../../../apis/article'

const useCreateArticle = (
  options: CustomMutationOptions<typeof Article.create> = {},
) => {
  return useMutation(Article.create, {
    ...options,
  })
}

export default useCreateArticle
