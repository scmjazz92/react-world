import { Comment } from '@prisma/client'
import { Exclude } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export class CommentEntity implements Comment {
  @IsString()
  @IsNotEmpty()
  readonly text: string

  @Exclude({ toPlainOnly: true })
  readonly userId: number

  @Exclude({ toPlainOnly: true })
  readonly articleId: number

  readonly createdAt: Date

  readonly updatedAt: Date

  readonly id: number

  constructor(partial: Partial<CommentEntity>) {
    Object.assign(this, partial)
  }
}
