import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from 'axios'
import Auth from '../apis/auth'
import { AppError } from './error'
import storage, { storageKeys } from './storage'

const client = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8000/api',
})

client.interceptors.request.use(
  (config) => {
    const access_token = storage.get(storageKeys.access_token)
    if (access_token) {
      const headers = config.headers as AxiosHeaders
      headers.set('Authorization', `Bearer ${access_token}`)
    }
    return config
  },
  (error) => Promise.reject(error),
)

client.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const { config, response } = error as AxiosError<AppError>
    if (
      response?.data.name === 'TokenExpiredError' ||
      response?.data.name === 'Unauthorized'
    ) {
      const refreshToken = storage.get(storageKeys.refresh_token)
      if (!refreshToken) return

      try {
        const { access_token, refresh_token } = await Auth.refresh(refreshToken)
        const headers = config?.headers as AxiosHeaders

        headers.set('Authorization', `Bearer ${access_token}`)
        storage.set(storageKeys.access_token, access_token)
        storage.set(storageKeys.refresh_token, refresh_token)
        return axios(config as AxiosRequestConfig)
      } catch (e) {
        storage.remove(storageKeys.access_token)
        storage.remove(storageKeys.refresh_token)
      }
    }
    return Promise.reject(error)
  },
)

export default client
