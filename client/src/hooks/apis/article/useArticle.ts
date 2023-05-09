import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { QUERY_KEYS } from '../../../lib/queryClient'
import { CustomQueryOptions } from '../../../lib/types'
import Article from '../../../apis/article'

interface Props {
  articleId: number
  options?: CustomQueryOptions<typeof Article.get>
}

const useArticle = ({ articleId, options = {} }: Props) => {
  return useQuery(
    [QUERY_KEYS.ARTICLES, articleId],
    () => Article.get(articleId),
    {
      ...options,
    },
  )
}

export default useArticle
