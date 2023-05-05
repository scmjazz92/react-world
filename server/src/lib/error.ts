import { HttpException } from '@nestjs/common'

export const errors = {
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
  NotFound: {
    statusCode: 404,
    message: 'Not Found',
  },
  Forbidden: {
    statusCode: 403,
    message: 'Forbidden',
  },
}

export type ErrorName = keyof typeof errors

export class AppError extends HttpException {
  name: string
  message: string
  statusCode: number

  constructor(name: ErrorName) {
    const errorInfo = errors[name]
    super(errorInfo.message, errorInfo.statusCode)
    this.message = errorInfo.message
    this.name = name
    this.statusCode = errorInfo.statusCode
  }
}
