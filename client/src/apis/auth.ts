import client from '../lib/client'
import { AuthParams, AuthResult, Tokens, User } from './types'

const Auth = {
  async register({ username, password }: AuthParams) {
    const response = await client.post<AuthResult>('/auth/register', {
      username,
      password,
    })
    return response.data
  },

  async login({ username, password }: AuthParams) {
    const response = await client.post<AuthResult>('/auth/login', {
      username,
      password,
    })
    return response.data
  },

  async refresh(refresh_token?: string | null) {
    const response = await client.get<Tokens>('/auth/refresh', {
      headers: refresh_token
        ? {
            refresh_token,
          }
        : undefined,
    })

    return response.data
  },
}

export default Auth
