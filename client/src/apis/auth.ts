import client from '../lib/client'
import { AuthParams, AuthResult } from './types'

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
}

export default Auth
