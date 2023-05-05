import { User } from '@prisma/client'
import { Exclude } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

export class UserEntity implements User {
  readonly id: number

  @IsString()
  readonly username: string

  @IsString()
  @Exclude({ toPlainOnly: true })
  readonly password: string

  @Exclude({ toPlainOnly: true })
  readonly createdAt: Date

  @IsString()
  @IsOptional()
  readonly profile: string | null

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }
}
