import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 0,
      suspense: true,
    },
  },
})

export const QUERY_KEYS = {
  REFRESH: 'refresh',
}

export default queryClient
