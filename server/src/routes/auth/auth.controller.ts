import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { CurrentUser } from 'src/common/decorators/user.decorator'
import { UserDto } from 'src/common/dtos/user.dto'
import { AppError } from 'src/lib/error'
import { AuthService } from 'src/services/auth.service'
import { AuthGuard } from './auth.guard'
import { UserBodyDto } from './dtos/user.body.dto'
import { AuthMeResult, AuthResult, TokensResult } from './schema'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() { username, password }: UserBodyDto) {
    const authResult = await this.authService.register({
      username,
      password,
    })
    return new AuthResult(authResult)
  }

  @Post('login')
  async login(@Body() { username, password }: UserBodyDto) {
    const authResult = await this.authService.login({ username, password })
    return new AuthResult(authResult)
  }

  @Get('refresh')
  async refresh(@Req() req: Request) {
    const refreshToken = (req.headers?.refresh_token ?? '') as string
    if (!refreshToken) {
      throw new AppError('BadRequest')
    }

    const tokens = await this.authService.refresh(refreshToken)
    return new TokensResult(tokens)
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@CurrentUser() user: UserDto) {
    return new AuthMeResult(user)
  }
}
