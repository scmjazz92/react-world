import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { QUERY_KEYS } from '../../../lib/queryClient'
import { CustomQueryOptions } from '../../../lib/types'
import Story from '../../../apis/story'
import { StoryMode } from '../../../apis/types'

interface Props {
  username: string
  mode: StoryMode
  options?: CustomQueryOptions<typeof Story.getAll>
}

const useStoryArticles = ({ username, mode, options }: Props) => {
  return useQuery(
    [QUERY_KEYS.ARTICLES, username, mode],
    () => Story.getAll({ username, mode }),
    {
      ...options,
      staleTime: 1000,
      cacheTime: 0,
    },
  )
}

export default useStoryArticles
