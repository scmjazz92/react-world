import axios from 'axios'

const client = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8000/api',
})

export default client
