export interface User {
  id: number
  username: string
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

export interface ArticlesResult {
  list: ArticleResult[]
}

export interface LikeResult {
  id: number
  isLiked: boolean
  articleStats: ArticleStats
}

export interface CommentParams {
  text: string
  articleId: number
}

export interface CommentResult {
  id: number
  text: string
  createdAt: Date
  updatedAt: Date
  user: User
}

export interface CommentsResult {
  list: CommentResult[]
}
