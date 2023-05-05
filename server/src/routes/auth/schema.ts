import { PickType } from '@nestjs/mapped-types'
import { UserDto } from 'src/common/dtos/user.dto'
import { TokenEntity } from 'src/entities/token'
import { UserEntity } from 'src/entities/user'

export class AccessTokenPayload extends PickType(TokenEntity, [
  'id',
  'userId',
] as const) {
  readonly type: 'access_token'

  readonly username: string
  readonly profile: string | null
}

export class RefreshTokenPayload extends PickType(TokenEntity, [
  'rotationCounter',
  'id',
] as const) {
  readonly type: 'refresh_token'
}

export class AuthResult {
  readonly user: UserDto
  readonly tokens: TokensResult

  constructor(partial: Partial<AuthResult>) {
    this.user = new UserEntity(partial.user)
    this.tokens = partial.tokens
  }
}

export class AuthMeResult extends UserEntity {
  constructor(partial: Partial<AuthMeResult>) {
    super(partial)
  }
}

export class TokensResult {
  readonly access_token: string
  readonly refresh_token: string

  constructor(partial: Partial<TokensResult>) {
    this.access_token = partial.access_token
    this.refresh_token = partial.refresh_token
  }
}
