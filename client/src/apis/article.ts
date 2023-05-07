import client from '../lib/client'
import { ArticleParams, ArticleResult } from './types'

const Article = {
  async create({ title, body, thumbnail }: ArticleParams) {
    const response = await client.post<ArticleResult>('/articles', {
      title,
      body,
      thumbnail,
    })
    return response.data
  },
}

export default Article
