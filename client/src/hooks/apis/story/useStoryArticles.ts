import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'
import { QUERY_KEYS } from '../../../lib/queryClient'
import { CustomInfiniteQueryOptions } from '../../../lib/types'
import Story from '../../../apis/story'
import { StoryMode } from '../../../apis/types'

interface Props {
  username: string
  mode: StoryMode
  options?: CustomInfiniteQueryOptions<typeof Story.getAll>
}

const useStoryArticles = ({ username, mode, options }: Props) => {
  return useInfiniteQuery(
    [QUERY_KEYS.ARTICLES, username, mode],
    ({ pageParam }) => Story.getAll({ username, mode, cursor: pageParam }),
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

export default useStoryArticles
