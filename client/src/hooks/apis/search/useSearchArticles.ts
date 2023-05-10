import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { QUERY_KEYS } from '../../../lib/queryClient'
import { CustomQueryOptions } from '../../../lib/types'
import Search from '../../../apis/search'

interface Props {
  value?: string
  options?: CustomQueryOptions<typeof Search.articles>
}

const useArticle = ({ value, options }: Props) => {
  const initialData = {
    list: [],
  }

  return useQuery([QUERY_KEYS.ARTICLES, value], () => Search.articles(value), {
    ...options,
    initialData: value ? undefined : initialData,
    staleTime: 1000,
    cacheTime: 0,
  })
}

export default useArticle
