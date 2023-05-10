import client from '../lib/client'
import { ArticlesResult } from './types'

const Search = {
  async articles(value?: string) {
    const query = value ? `?value=${value}` : ''
    const response = await client.get<ArticlesResult>(`/search${query}`)
    return response.data
  },
}

export default Search
