import axios from 'axios'

export type ErrorFormat = {
  message: string
  code: number
  title: string
}

const HTTP_ERRORS: Record<number, ErrorFormat> = {
  401: {
    code: 401,
    title: 'Unauthorized',
    message: 'You are not authorized to perform this action.',
  },
  404: {
    code: 404,
    title: 'Not Found',
    message: "The page you are looking for doesn't exist or has been moved.",
  },
  500: { code: 500, title: 'Server Error', message: 'Oops, something went wrong.' },
}

const FALLBACK: ErrorFormat = {
  code: 0,
  title: 'Unknown Error',
  message: 'Something went wrong.',
}

export function resolveApiError(error: unknown): ErrorFormat {
  if (typeof error === 'number' && error in HTTP_ERRORS) {
    return HTTP_ERRORS[error]
  }
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    if (status !== undefined && status in HTTP_ERRORS) {
      return HTTP_ERRORS[status]
    }
  }
  if (error instanceof Error) {
    return { ...FALLBACK, message: error.message }
  }
  if (typeof error === 'string') {
    return { ...FALLBACK, message: error }
  }
  return FALLBACK
}
