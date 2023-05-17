import { Exclude } from 'class-transformer'
import { UserDto } from 'src/common/dtos/user.dto'
import { PageInfo } from 'src/common/schema/schema'
import { ArticleEntity } from 'src/entities/article'
import { ArticleLikeEntity } from 'src/entities/article.like'
import { ArticleStatsEntity } from 'src/entities/article.stats'
import { CommentEntity } from 'src/entities/comment'
import { UserEntity } from 'src/entities/user'

export class ArticleResult extends ArticleEntity {
  readonly user: UserEntity

  readonly articleStats: ArticleStatsEntity

  readonly isLiked: boolean

  @Exclude({ toPlainOnly: true })
  readonly articleLike: Partial<ArticleLikeEntity>[]

  @Exclude({ toPlainOnly: true })
  readonly comment: Partial<CommentEntity>[]

  constructor(partial: Partial<ArticleResult>) {
    super(partial)
    this.user = new UserEntity(partial.user)
    this.articleStats = new ArticleStatsEntity(partial.articleStats)
  }
}

export class ArticlesResult {
  readonly list: ArticleResult[]

  readonly pageInfo: PageInfo

  constructor(partial: Partial<ArticlesResult>) {
    this.list = partial.list.map(
      (list: ArticleResult) => new ArticleResult(list),
    )
    this.pageInfo = new PageInfo(partial.pageInfo)
  }
}

export class CommentResultSchema extends CommentEntity {
  readonly user: UserDto

  constructor(partial: Partial<CommentResultSchema>) {
    super(partial)
    this.user = new UserEntity(partial.user)
  }
}

export class CommentsResultSchema {
  readonly list: CommentResultSchema[]

  constructor(partial: Partial<CommentsResultSchema>) {
    this.list = partial.list.map(
      (list: CommentResultSchema) => new CommentResultSchema(list),
    )
  }
}

export class ArticleLikeResult extends ArticleEntity {
  readonly articleStats: ArticleStatsEntity

  constructor(partial: Partial<ArticleLikeResult>) {
    super(partial)
    this.articleStats = new ArticleStatsEntity(partial.articleStats)
  }
}
