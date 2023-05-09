import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { CustomMutationOptions } from '../../../lib/types'
import Article from '../../../apis/article'
import queryClient, { QUERY_KEYS } from '../../../lib/queryClient'
import { ArticleResult } from '../../../apis/types'

const useUpdateArticle = (
  options: CustomMutationOptions<typeof Article.update> = {},
) => {
  return useMutation(Article.update, {
    ...options,
    onSuccess(newArticle) {
      const { id, title, body, thumbnail } = newArticle

      const prevArticle = queryClient.getQueryData<ArticleResult>([
        QUERY_KEYS.ARTICLES,
        id,
      ])

      if (!prevArticle) return

      const resultArticle = {
        ...prevArticle,
        title,
        body,
        thumbnail,
      }

      queryClient.setQueryData([QUERY_KEYS.ARTICLES, id], resultArticle)
    },
  })
}

export default useUpdateArticle
