import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'
import { QUERY_KEYS } from '../../../lib/queryClient'
import { CustomInfiniteQueryOptions } from '../../../lib/types'
import Search from '../../../apis/search'

interface Props {
  value?: string
  options?: CustomInfiniteQueryOptions<typeof Search.articles>
}

const useSearchArticles = ({ value, options }: Props) => {
  const initialData = {
    pages: [
      {
        list: [],
        pageInfo: {
          endCursor: 0,
          hasNextPage: false,
          totalCount: 0,
        },
      },
    ],
    pageParams: [],
  }

  return useInfiniteQuery(
    [QUERY_KEYS.ARTICLES, value],
    ({ pageParam }) => Search.articles({ value, cursor: pageParam }),
    {
      ...options,
      initialData: value ? undefined : initialData,
      getNextPageParam(lastPage) {
        if (!lastPage.pageInfo.hasNextPage) return undefined
        return lastPage.pageInfo.endCursor
      },
      staleTime: 1000,
      cacheTime: 0,
    },
  )
}

export default useSearchArticles
