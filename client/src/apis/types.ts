export interface User {
  id: number
  username: string
  profile: string | null
}

export interface Tokens {
  access_token: string
  refresh_token: string
}

export interface AuthParams {
  username: string
  password: string
}

export interface AuthResult {
  user: User
  tokens: Tokens
}
