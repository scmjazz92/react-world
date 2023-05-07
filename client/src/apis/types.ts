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

export interface UploadParams {
  formData: FormData
  path: string
}

export interface UploadResult {
  url: string[]
}

export interface ArticleParams {
  title: string
  body: string
  thumbnail?: string
}

export interface ArticleStats {
  commentsCount: number
  id: number
  likes: number
  views: number
}

export interface ArticleResult {
  id: number
  title: string
  body: string
  thumbnail: string | null
  createdAt: Date
  updatedAt: Date
  isLiked: boolean
  user: User
  articleStats: ArticleStats
}
