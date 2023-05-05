import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { UserDto } from 'src/common/dtos/user.dto'
import { AppError } from 'src/lib/error'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest()
    const user = req.user as UserDto

    if (req.isExpiredToken) {
      throw new AppError('TokenExpiredError')
    }

    if (!user) {
      throw new AppError('Unauthorized')
    }

    return true
  }
}
