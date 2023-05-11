import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { AuthRepository } from 'src/repositories/auth.repository'
import { UserBodyDto } from 'src/routes/auth/dtos/user.body.dto'
import * as bcrypt from 'bcrypt'
import { AppError } from 'src/lib/error'
import { JwtService } from './jwt.service'
import { Token, User } from '@prisma/client'
import { RefreshTokenPayload } from 'src/routes/auth/schema'
import { ChangePasswordDto } from 'src/routes/auth/dtos/change.password.dto'
import validate from 'src/lib/validate'

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(user: User, tokenItem?: Token) {
    const { id: userId, username } = user
    const token =
      tokenItem ?? (await this.authRepository.createTokenItem(userId))
    const tokenId = token.id

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.generateToken({
        type: 'access_token',
        userId,
        username,
        id: tokenId,
      }),
      this.jwtService.generateToken({
        type: 'refresh_token',
        id: tokenId,
        rotationCounter: token.rotationCounter,
      }),
    ])

    return {
      access_token,
      refresh_token,
    }
  }

  async register({ username, password }: UserBodyDto) {
    const exists = await this.authRepository.existsByUsername(username)
    if (exists) {
      throw new AppError('ExistsUsername')
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await this.authRepository.createUser({
      username,
      password: passwordHash,
    })

    const tokens = await this.generateTokens(user)

    return {
      user,
      tokens,
    }
  }

  async login({ username, password }: UserBodyDto) {
    const user = await this.authRepository.existsByUsername(username)
    if (!user) {
      throw new AppError('WrongCredentials')
    }

    const result = await bcrypt.compare(password, user.password)
    if (!result) {
      throw new AppError('WrongCredentials')
    }

    const tokens = await this.generateTokens(user)

    return {
      user,
      tokens,
    }
  }

  async refresh(refreshToken: string) {
    try {
      const { id: tokenId, rotationCounter } =
        await this.jwtService.validateToken<RefreshTokenPayload>(refreshToken)

      const tokenItem = await this.authRepository.getTokenItem(tokenId)
      if (!tokenItem) {
        throw new Error('Token not found')
      }
      if (tokenItem.blocked) {
        throw new Error('Token is blocked')
      }
      if (tokenItem.rotationCounter !== rotationCounter) {
        await this.authRepository.tokenUpdate(tokenId, { blocked: true })
        throw new Error('Rotation counter does not match')
      }

      tokenItem.rotationCounter += 1
      await this.authRepository.tokenUpdate(tokenId, {
        rotationCounter: tokenItem.rotationCounter,
      })

      return this.generateTokens(tokenItem.user, tokenItem)
    } catch (e) {
      throw new AppError('RefreshFailure')
    }
  }

  async changePassword({
    currentPassword,
    changePassword,
    userId,
  }: ChangePasswordDto & { userId: number }) {
    const user = await this.authRepository.existsByUser(userId)

    if (!validate.password(changePassword)) {
      throw new BadRequestException('Password is invalid')
    }

    try {
      if (!user) {
        throw new Error()
      }

      const result = await bcrypt.compare(currentPassword, user.password)
      if (!result) {
        throw new Error()
      }
    } catch (e) {
      throw new ForbiddenException('Password does not match')
    }

    const newPassword = await bcrypt.hash(changePassword, 10)
    await this.authRepository.changePassword({
      changePassword: newPassword,
      userId,
    })
  }

  async unRegister(userId: number) {
    await this.authRepository.unRegister(userId)
  }
}
