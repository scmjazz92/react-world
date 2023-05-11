import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { Request } from 'express'
import { CurrentUser } from 'src/common/decorators/user.decorator'
import { UserDto } from 'src/common/dtos/user.dto'
import { AppError } from 'src/lib/error'
import { AuthService } from 'src/services/auth.service'
import { AuthGuard } from './auth.guard'
import { ChangePasswordDto } from './dtos/change.password.dto'
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

  @Post('change-password')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  async changePassword(
    @CurrentUser() user: UserDto,
    @Body() { currentPassword, changePassword }: ChangePasswordDto,
  ) {
    await this.authService.changePassword({
      currentPassword,
      changePassword,
      userId: user.id,
    })
  }

  @Delete()
  @UseGuards(AuthGuard)
  @HttpCode(204)
  async unRegister(@CurrentUser() user: UserDto) {
    await this.authService.unRegister(user.id)
  }
}
