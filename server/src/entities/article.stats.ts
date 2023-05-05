import { ArticleStats } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class ArticleStatsEntity implements ArticleStats {
  @Exclude({ toPlainOnly: true })
  readonly articleId: number

  readonly id: number

  readonly likes: number

  readonly commentsCount: number

  readonly views: number

  constructor(partial: Partial<ArticleStatsEntity>) {
    Object.assign(this, partial)
  }
}
