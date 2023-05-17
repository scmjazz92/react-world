import client from '../lib/client'
import { ArticlesResult, Pagination } from './types'

const Search = {
  async articles({
    value,
    limit = 20,
    cursor,
  }: { value?: string } & Pagination) {
    const query = value ? `?value=${value}` : ''
    const paginationQuery = cursor ? `&limit=${limit}&cursor=${cursor}` : ''
    const response = await client.get<ArticlesResult>(
      `/search${query}${paginationQuery}`,
    )
    return response.data
  },
}

export default Search
