const errors = {
  ExistsUsername: {
    statusCode: 409,
    message: 'username already exists',
  },
  WrongCredentials: {
    statusCode: 401,
    message: 'Invalid username or password',
  },
  TokenExpiredError: {
    statusCode: 401,
    message: 'jwt expired',
  },
  RefreshFailure: {
    statusCode: 401,
    message: 'Failed to refresh token',
  },
  BadRequest: {
    statusCode: 400,
    message: 'Bad Request',
  },
  Unauthorized: {
    statusCode: 401,
    message: 'Unauthorized',
  },
}

export type ErrorName = keyof typeof errors

export const errorMessageMap: Partial<Record<ErrorName, string>> = {
  ExistsUsername: '이미 존재하는 계정입니다.',
  WrongCredentials: '잘못된 계정 정보입니다.',
}

export const AppErrorMessage = (name?: ErrorName) => {
  if (name) {
    return errorMessageMap[name]
  }
}

export interface AppError {
  name: ErrorName
  message: string
  statusCode: number
}
