import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Auth from '../../../apis/auth'
import { QUERY_KEYS } from '../../../lib/queryClient'
import storage, { storageKeys } from '../../../lib/storage'
import {
  AccessTokenPayload,
  parseJwt,
  remainingTokenExpirationTime,
} from '../../../lib/tokens'
import { CustomQueryOptions } from '../../../lib/types'

const useRefresh = (options: CustomQueryOptions<typeof Auth.refresh> = {}) => {
  const access_token = storage.get(storageKeys.access_token)
  const refresh_token = storage.get(storageKeys.refresh_token)
  const parse = parseJwt<AccessTokenPayload>(access_token)
  const accessTokenExpirationTime = remainingTokenExpirationTime(parse?.exp)

  return useQuery(
    [QUERY_KEYS.REFRESH, access_token],
    () => Auth.refresh(refresh_token),
    {
      ...options,
      enabled:
        !accessTokenExpirationTime && (!!access_token || !!refresh_token),
      onSuccess({ access_token, refresh_token }) {
        storage.set(storageKeys.access_token, access_token)
        storage.set(storageKeys.refresh_token, refresh_token)
      },
      onError() {
        storage.remove(storageKeys.access_token)
        storage.remove(storageKeys.refresh_token)
      },
    },
  )
}

export default useRefresh
