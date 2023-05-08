import { User } from '../apis/types'
import storage, { storageKeys } from './storage'
import {
  AccessTokenPayload,
  parseJwt,
  remainingTokenExpirationTime,
} from './tokens'

const getUserFromAccessToken = (token: AccessTokenPayload): User => {
  const { userId, username } = token
  return {
    id: userId,
    username: username,
  }
}

export const getUser = () => {
  const access_token = storage.get(storageKeys.access_token)
  const parse = parseJwt<AccessTokenPayload>(access_token)
  const accessTokenExpirationTime = remainingTokenExpirationTime(parse?.exp)

  const initialData = accessTokenExpirationTime
    ? getUserFromAccessToken(parse!)
    : undefined

  return initialData ?? null
}
