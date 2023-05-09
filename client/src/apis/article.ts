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

  async get(articlesId: number) {
    const response = await client.get<ArticleResult>(`/articles/${articlesId}`)
    return response.data
  },

  async getAll() {
    const response = await client.get<ArticlesResult>(`/articles`)
    return response.data
  },

  async delete(articleId: number) {
    const response = await client.delete(`/articles/${articleId}`)
    return response.data
  },

  async update({
    title,
    body,
    articleId,
    thumbnail,
  }: ArticleParams & { articleId: number }) {
    const response = await client.patch<ArticleResult>(
      `/articles/${articleId}`,
      {
        title,
        body,
        thumbnail,
      },
    )
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
