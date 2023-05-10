import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { CustomMutationOptions } from '../../../lib/types'
import Article from '../../../apis/article'
import queryClient, { QUERY_KEYS } from '../../../lib/queryClient'

const useDeleteArticle = (
  options: CustomMutationOptions<typeof Article.delete> = {},
) => {
  return useMutation(Article.delete, {
    ...options,
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEYS.ARTICLES], { exact: true })
    },
  })
}

export default useDeleteArticle
