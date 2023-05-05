import { ArticleLike } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class ArticleLikeEntity implements ArticleLike {
  @Exclude({ toPlainOnly: true })
  id: number

  @Exclude({ toPlainOnly: true })
  createdAt: Date

  @Exclude({ toPlainOnly: true })
  updatedAt: Date

  @Exclude({ toPlainOnly: true })
  articleId: number

  @Exclude({ toPlainOnly: true })
  userId: number

  constructor(partial: Partial<ArticleLikeEntity>) {
    Object.assign(this, partial)
  }
}
