import client from '../lib/client'
import {
  ArticleParams,
  ArticleResult,
  ArticlesResult,
  LikeResult,
} from './types'

const Article = {
  async create({ title, body, thumbnail }: ArticleParams) {
    const response = await client.post<ArticleResult>('/articles', {
      title,
      body,
      thumbnail,
    })
    return response.data
  },

  async getAll() {
    const response = await client.get<ArticlesResult>(`/articles`)
    return response.data
  },

  async like(articleId: number) {
    const response = await client.post<LikeResult>(
      `/articles/${articleId}/likes`,
    )
    return response.data
  },

  async unlike(articleId: number) {
    const response = await client.delete<LikeResult>(
      `/articles/${articleId}/likes`,
    )
    return response.data
  },
}

export default Article
