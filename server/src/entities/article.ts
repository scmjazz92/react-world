import { Article } from '@prisma/client'
import { Exclude } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class ArticleEntity implements Article {
  @IsString()
  @IsNotEmpty()
  readonly title: string

  @IsString()
  @IsNotEmpty()
  readonly body: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly thumbnail: string | null

  @Exclude({ toPlainOnly: true })
  readonly userId: number

  readonly createdAt: Date

  readonly updatedAt: Date

  readonly id: number

  constructor(partial: Partial<ArticleEntity>) {
    Object.assign(this, partial)
  }
}
