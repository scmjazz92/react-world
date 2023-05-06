export interface AccessTokenPayload {
  exp: number
  iat: number
  id: number
  type: 'access_token'
  userId: number
  username: string
  profile: string | null
}

export interface RefreshTokenPayload {
  exp: number
  iat: number
  id: number
  rotationCounter: number
  type: 'refresh_token'
}

export const parseJwt = <T>(token?: string | null) => {
  if (!token) return null
  const base64Url = token.split('.')[1]
  if (!base64Url) return null

  const base64 = base64Url.replace('-', '+').replace('_', '/')
  const parse = JSON.parse(atob(base64))
  return parse as T
}

export const timeRemaining = (expirationTime: Date) => {
  const currentTime = new Date()
  return (expirationTime.getTime() - currentTime.getTime()) / 1000
}

export const remainingTokenExpirationTime = (exp?: number) => {
  if (!exp) return 0
  const time = timeRemaining(new Date(exp * 1000))
  return time > 0 ? time : 0
}
