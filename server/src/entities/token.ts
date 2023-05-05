import { Token } from '@prisma/client'

export class TokenEntity implements Token {
  readonly id: number

  readonly rotationCounter: number

  readonly createdAt: Date

  readonly blocked: boolean

  readonly userId: number
}
