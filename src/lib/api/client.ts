import axios from 'axios'
import { env } from '@/lib/env'
import { resolveApiError } from '@/lib/api/api-error'

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    apikey: env.omdbApiKey,
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(resolveApiError(error)),
)
