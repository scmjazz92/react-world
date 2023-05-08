import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { QUERY_KEYS } from '../../../lib/queryClient'
import { CustomQueryOptions } from '../../../lib/types'
import Article from '../../../apis/article'

const useArticles = (
  options: CustomQueryOptions<typeof Article.getAll> = {},
) => {
  return useQuery([QUERY_KEYS.ARTICLES], Article.getAll, {
    ...options,
    staleTime: 1000,
    cacheTime: 0,
  })
}

export default useArticles
