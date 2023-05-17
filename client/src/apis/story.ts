import client from '../lib/client'
import { ArticlesResult, Pagination, StoryParams } from './types'

const Story = {
  async getAll({
    username,
    mode,
    limit = 20,
    cursor,
  }: StoryParams & Pagination) {
    const query = cursor ? `&limit=${limit}&cursor=${cursor}` : ''
    const response = await client.get<ArticlesResult>(
      `/story/${username}?mode=${mode}${query}`,
    )
    return response.data
  },
}

export default Story
