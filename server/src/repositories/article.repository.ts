import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ArticleBodyDto } from 'src/routes/article/dtos/article.body.dto'

@Injectable()
export class ArticleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createArticle({
    title,
    body,
    thumbnail,
    userId,
  }: ArticleBodyDto & { userId: number }) {
    const article = await this.prisma.article.create({
      data: {
        title,
        body,
        userId,
        thumbnail,
      },
      include: {
        user: true,
      },
    })

    return article
  }

  async getArticle({
    userId,
    articleId,
  }: {
    userId: number
    articleId: number
  }) {
    const article = await this.prisma.article.findUnique({
      where: {
        id: articleId,
      },
      include: {
        user: true,
        comment: true,
        articleStats: true,
        articleLike: userId ? { where: { userId } } : false,
      },
    })

    return article
  }

  async getArticles({ userId, value }: { userId: number; value?: string }) {
    const articles = await this.prisma.article.findMany({
      where: {
        OR: value
          ? [{ title: { contains: value } }, { body: { contains: value } }]
          : undefined,
      },
      orderBy: {
        id: 'desc',
      },
      include: {
        user: true,
        comment: true,
        articleStats: true,
        articleLike: userId ? { where: { userId } } : false,
      },
    })

    return articles
  }

  async getUserArticles({
    userId,
    username,
  }: {
    userId: number
    username?: string
  }) {
    const articles = await this.prisma.article.findMany({
      where: {
        user: {
          username,
        },
      },
      orderBy: {
        id: 'desc',
      },
      include: {
        user: true,
        comment: true,
        articleStats: true,
        articleLike: userId ? { where: { userId } } : false,
      },
    })

    return articles
  }

  async getLikeArticles({ userId }: { userId: number }) {
    const articles = await this.prisma.article.findMany({
      where: {
        articleLike: {
          some: {
            userId,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
      include: {
        user: true,
        comment: true,
        articleStats: true,
        articleLike: userId ? { where: { userId } } : false,
      },
    })

    return articles
  }

  async deleteArticle(articleId: number) {
    await this.prisma.article.delete({
      where: {
        id: articleId,
      },
    })
  }

  async updateArticle({
    title,
    body,
    thumbnail,
    articleId,
    userId,
  }: ArticleBodyDto & { articleId: number; userId: number }) {
    const article = await this.prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        title,
        body,
        thumbnail,
      },
      include: {
        user: true,
        articleStats: true,
        articleLike: userId ? { where: { userId } } : false,
      },
    })

    return article
  }

  async createArticleStats(articleId: number) {
    const articleStats = await this.prisma.articleStats.create({
      data: {
        articleId,
      },
    })
    return articleStats
  }

  async updateArticleComment({
    articleId,
    commentsCount,
  }: {
    articleId: number
    commentsCount: number
  }) {
    await this.prisma.articleStats.update({
      where: {
        articleId,
      },
      data: {
        commentsCount,
      },
    })
  }

  async likeArticle({
    articleId,
    userId,
  }: {
    articleId: number
    userId: number
  }) {
    await this.prisma.articleLike.create({
      data: {
        userId,
        articleId,
      },
    })
  }

  async unlikeArticle({
    articleId,
    userId,
  }: {
    articleId: number
    userId: number
  }) {
    await this.prisma.articleLike.delete({
      where: {
        articleId_userId: {
          articleId,
          userId,
        },
      },
    })
  }

  async updateArticleLikes({
    articleId,
    likes,
  }: {
    articleId: number
    likes: number
  }) {
    const updateArticle = await this.prisma.articleStats.update({
      where: {
        articleId,
      },
      data: {
        likes,
      },
    })
    return updateArticle
  }

  async articleLikeCount(articleId: number) {
    const count = await this.prisma.articleLike.count({
      where: {
        articleId,
      },
    })
    return count
  }

  async getLikeArticle({
    articleId,
    userId,
  }: {
    articleId: number
    userId: number
  }) {
    const article = await this.prisma.articleLike.findUnique({
      where: {
        articleId_userId: {
          articleId,
          userId,
        },
      },
    })

    return article
  }

  async updateArticleView(articleId: number) {
    await this.prisma.articleStats.update({
      where: {
        id: articleId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    })
  }
}
