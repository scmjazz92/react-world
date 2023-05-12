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

const userStateEffect =
  () =>
  ({ setSelf }: any) =>
    setSelf(() => getUser())

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
  effects: [userStateEffect()],
})

export const userSelector = selector<User | null>({
  key: 'userSelector',
  get: ({ get }) => {
    return get(userState)
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue || !newValue) return
    set(userState, newValue)
  },
})
