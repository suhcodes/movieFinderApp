import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string | undefined,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    apikey: import.meta.env.VITE_OMDB_API_KEY as string | undefined,
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(error),
)
