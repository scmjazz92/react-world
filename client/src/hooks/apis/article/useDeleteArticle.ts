import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { CustomMutationOptions } from '../../../lib/types'
import Article from '../../../apis/article'

const useDeleteArticle = (
  options: CustomMutationOptions<typeof Article.delete> = {},
) => {
  return useMutation(Article.delete, {
    ...options,
  })
}

export default useDeleteArticle
