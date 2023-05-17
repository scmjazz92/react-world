import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'
import { QUERY_KEYS } from '../../../lib/queryClient'
import { CustomInfiniteQueryOptions } from '../../../lib/types'
import Article from '../../../apis/article'

const useArticles = (
  options: CustomInfiniteQueryOptions<typeof Article.getAll> = {},
) => {
  return useInfiniteQuery(
    [QUERY_KEYS.ARTICLES],
    ({ pageParam }) => Article.getAll({ cursor: pageParam }),
    {
      ...options,
      getNextPageParam(lastPage) {
        if (!lastPage.pageInfo.hasNextPage) return undefined
        return lastPage.pageInfo.endCursor
      },
      staleTime: 1000,
      cacheTime: 0,
    },
  )
}

export default useArticles
