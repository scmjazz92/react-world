import { atom, DefaultValue, selector } from 'recoil'
import { User } from '../apis/types'
import storage, { storageKeys } from '../lib/storage'
import {
  AccessTokenPayload,
  getUserFromAccessToken,
  parseJwt,
  remainingTokenExpirationTime,
} from '../lib/tokens'

export const getUser = () => {
  const access_token = storage.get(storageKeys.access_token)
  const parse = parseJwt<AccessTokenPayload>(access_token)
  const accessTokenExpirationTime = remainingTokenExpirationTime(parse?.exp)

  const initialData = accessTokenExpirationTime
    ? getUserFromAccessToken(parse!)
    : undefined

  return initialData ?? null
}

export const userState = atom<User | null>({
  key: 'userState',
  default: getUser(),
})

export const userSelector = selector<User | null>({
  key: 'userSelector',
  get: ({ get }) => {
    const items = get(userState)
    return items
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue || !newValue) return
    set(userState, newValue)
  },
})
