import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware'
import { AuthRepository } from 'src/repositories/auth.repository'
import { AuthService } from 'src/services/auth.service'
import { JwtService } from 'src/services/jwt.service'
import { AuthController } from './auth.controller'

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtService],
  exports: [AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
