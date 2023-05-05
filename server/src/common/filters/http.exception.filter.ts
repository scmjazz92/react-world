import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common'
import { Response } from 'express'
import { AppError } from 'src/lib/error'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    const exceptionError = exception.getResponse() as {
      error: string
      message: string | string[]
      statusCode: number
    }
    const { name, message } = exception

    if (exception instanceof AppError) {
      response.status(status).json({
        name,
        message,
        statusCode: status,
      })
    } else {
      response.status(status).json({
        name: exceptionError.error,
        message: exceptionError.message,
        statusCode: exceptionError.statusCode,
      })
    }
  }
}
