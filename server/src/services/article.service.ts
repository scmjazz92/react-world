import { AuthRepository } from 'src/repositories/auth.repository'
import { Injectable } from '@nestjs/common'
import {
  Article,
  ArticleLike,
  ArticleStats,
  Comment,
  User,
} from '@prisma/client'
import { AppError } from 'src/lib/error'
import { ArticlesMode } from 'src/lib/types'
import { ArticleRepository } from 'src/repositories/article.repository'
import { ArticleBodyDto } from 'src/routes/article/dtos/article.body.dto'
import { PaginationDto } from 'src/common/dtos/pagination.dto'

type SerializeArticle = Article & {
  user: User
  articleLike: ArticleLike[]
  articleStats: ArticleStats
  comment: Comment[]
}

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly authRepository: AuthRepository,
  ) {}

  private serialize(article: SerializeArticle) {
    return {
      ...article,
      articleStats: {
        ...article.articleStats,
        commentsCount: article.comment.length,
        likes: article.articleLike?.length ?? 0,
      },
      isLiked: !!article.articleLike?.length,
    }
  }

  async createArticle({
    title,
    body,
    thumbnail,
    userId,
  }: ArticleBodyDto & { userId: number }) {
    const article = await this.articleRepository.createArticle({
      userId,
      title,
      body,
      thumbnail,
    })

    const articleStats = await this.articleRepository.createArticleStats(
      article.id,
    )

    return { ...article, articleStats }
  }

  async getArticle({
    articleId,
    userId,
  }: {
    articleId: number
    userId: number
  }) {
    const article = await this.articleRepository.getArticle({
      articleId,
      userId,
    })
    if (!article) {
      throw new AppError('NotFound')
    }
    await this.articleRepository.updateArticleView(articleId)

    return this.serialize(article)
  }

  async getArticles({
    userId,
    value,
    mode,
    username,
    limit = 20,
    cursor,
  }: {
    userId: number
    value?: string
    mode?: ArticlesMode
    username?: string
  } & PaginationDto) {
    if (mode === 'user') {
      return this.getUserArticles({ username, userId, limit, cursor })
    }

    if (mode === 'like') {
      return this.getLikeArticles({ username, userId, limit, cursor })
    }

    const [list, totalCount] = await Promise.all([
      this.articleRepository.getArticles({
        userId,
        value,
        limit,
        cursor,
      }),
      this.articleRepository.totalCount(
        value
          ? {
              where: {
                OR: value
                  ? [
                      { title: { contains: value } },
                      { body: { contains: value } },
                    ]
                  : undefined,
              },
            }
          : undefined,
      ),
    ])

    const endCursor = list.at(-1)?.id ?? null
    const hasNextPage = endCursor
      ? await this.articleRepository.hasNextPage({
          endCursor,
          ...(value
            ? {
                where: {
                  OR: value
                    ? [
                        { title: { contains: value } },
                        { body: { contains: value } },
                      ]
                    : undefined,
                },
              }
            : undefined),
        })
      : false

    const serializedList = list.map((article) => {
      return this.serialize(article)
    })

    return {
      list: serializedList,
      pageInfo: {
        totalCount,
        endCursor,
        hasNextPage,
      },
    }
  }

  async getUserArticles({
    username,
    userId,
    limit,
    cursor,
  }: {
    username: string
    userId: number
  } & PaginationDto) {
    const user = await this.authRepository.existsByUsername(username)
    if (!user) {
      throw new AppError('NotFound')
    }

    const [list, totalCount] = await Promise.all([
      this.articleRepository.getUserArticles({
        username,
        userId,
        limit,
        cursor,
      }),
      this.articleRepository.totalCount({
        where: {
          userId: user.id,
        },
      }),
    ])

    const endCursor = list.at(-1)?.id ?? null
    const hasNextPage = endCursor
      ? await this.articleRepository.hasNextPage({
          endCursor,
          where: {
            userId: user.id,
          },
        })
      : false

    const serializedList = list.map((article) => {
      return this.serialize(article)
    })

    return {
      list: serializedList,
      pageInfo: {
        totalCount,
        endCursor,
        hasNextPage,
      },
    }
  }

  async getLikeArticles({
    username,
    userId,
    limit,
    cursor,
  }: {
    username: string
    userId: number
  } & PaginationDto) {
    const user = await this.authRepository.existsByUsername(username)
    if (!user) {
      throw new AppError('NotFound')
    }

    const [list, totalCount] = await Promise.all([
      this.articleRepository.getLikeArticles({
        userId,
        userArticleId: user.id,
        limit,
        cursor,
      }),
      this.articleRepository.totalCount({
        where: {
          articleLike: {
            some: {
              userId: user.id,
            },
          },
        },
      }),
    ])

    const endCursor = list.at(-1)?.id ?? null
    const hasNextPage = endCursor
      ? await this.articleRepository.hasNextPage({
          endCursor,
          where: {
            articleLike: {
              some: {
                userId: user.id,
              },
            },
          },
        })
      : false

    const serializedList = list.map((article) => {
      return { ...this.serialize(article) }
    })

    return {
      list: serializedList,
      pageInfo: {
        totalCount,
        endCursor,
        hasNextPage,
      },
    }
  }

  async deleteArticle({
    articleId,
    userId,
  }: {
    articleId: number
    userId: number
  }) {
    const article = await this.getArticle({ userId, articleId })
    if (article.userId !== userId) {
      throw new AppError('Forbidden')
    }

    await this.articleRepository.deleteArticle(articleId)
  }

  async updateArticle({
    title,
    body,
    thumbnail,
    userId,
    articleId,
  }: ArticleBodyDto & { articleId: number; userId: number }) {
    const article = await this.getArticle({ userId, articleId })
    if (article.userId !== userId) {
      throw new AppError('Forbidden')
    }

    const updateArticle = await this.articleRepository.updateArticle({
      title,
      body,
      thumbnail,
      articleId,
      userId,
    })

    return updateArticle
  }

  async likeArticle({
    articleId,
    userId,
  }: {
    articleId: number
    userId: number
  }) {
    const alreadyLiked = await this.articleRepository.getLikeArticle({
      userId,
      articleId,
    })
    if (!alreadyLiked) {
      try {
        await this.articleRepository.likeArticle({ userId, articleId })
      } catch (e) {}
    }

    const likes = await this.articleRepository.articleLikeCount(articleId)
    const articleStats = await this.articleRepository.updateArticleLikes({
      articleId,
      likes,
    })

    return { id: articleId, isLiked: true, articleStats }
  }

  async unlikeArticle({
    articleId,
    userId,
  }: {
    articleId: number
    userId: number
  }) {
    try {
      await this.articleRepository.unlikeArticle({ articleId, userId })
    } catch (e) {}

    const likes = await this.articleRepository.articleLikeCount(articleId)
    const articleStats = await this.articleRepository.updateArticleLikes({
      articleId,
      likes,
    })

    return { id: articleId, isLiked: false, articleStats }
  }
}
