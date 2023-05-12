import client from '../lib/client'
import { AuthParams, AuthResult, ChangePasswordParams, Tokens } from './types'

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

  async changePassword({
    currentPassword,
    changePassword,
  }: ChangePasswordParams) {
    const response = await client.post('/auth/change-password', {
      currentPassword,
      changePassword,
    })
    return response.data
  },

  async unRegister() {
    const response = await client.delete('/auth')
    return response.data
  },
}

export default Auth
