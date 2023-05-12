import client from '../lib/client'
import { ArticlesResult, StoryParams } from './types'

const Story = {
  async getAll({ username, mode }: StoryParams) {
    const response = await client.get<ArticlesResult>(
      `/story/${username}?mode=${mode}`,
    )
    return response.data
  },
}

export default Story
