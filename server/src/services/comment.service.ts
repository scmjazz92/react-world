import { Injectable } from '@nestjs/common'
import { CommentBodyDto } from 'src/common/dtos/comment.body.dto'
import { AppError } from 'src/lib/error'
import { ArticleRepository } from 'src/repositories/article.repository'
import { CommentRepository } from 'src/repositories/comment.repository'

@Injectable()
export class CommentSevice {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly articleRepository: ArticleRepository,
  ) {}

  async createComment({
    userId,
    articleId,
    text,
  }: CommentBodyDto & { articleId: number; userId: number }) {
    const article = await this.articleRepository.getArticle({
      articleId,
      userId,
    })
    if (!article) {
      throw new AppError('NotFound')
    }

    const comment = await this.commentRepository.createComment({
      articleId,
      userId,
      text,
    })

    const commentsCount = await this.commentRepository.commentCount(articleId)
    await this.articleRepository.updateArticleComment({
      articleId,
      commentsCount,
    })

    return comment
  }

  async getComments(articleId: number) {
    const comments = await this.commentRepository.getComments(articleId)

    return {
      list: comments,
    }
  }

  async getComment({
    articleId,
    commentId,
  }: {
    articleId: number
    commentId?: number
  }) {
    const comment = await this.commentRepository.getComment(commentId)
    if (comment?.articleId !== articleId || !comment) {
      throw new AppError('NotFound')
    }

    return comment
  }

  async updateComment({
    articleId,
    userId,
    text,
    commentId,
  }: CommentBodyDto & {
    articleId: number
    userId: number
    commentId: number
  }) {
    const comment = await this.getComment({ articleId, commentId })
    if (comment.userId !== userId) {
      throw new AppError('Forbidden')
    }

    const updatedComment = await this.commentRepository.updateComment({
      text,
      commentId,
    })

    return updatedComment
  }

  async deleteComment({
    userId,
    articleId,
    commentId,
  }: {
    articleId: number
    userId: number
    commentId: number
  }) {
    const comment = await this.getComment({ articleId, commentId })
    if (comment.userId !== userId) {
      throw new AppError('Forbidden')
    }
    await this.commentRepository.deleteComment(commentId)

    const commentsCount = await this.commentRepository.commentCount(articleId)
    await this.articleRepository.updateArticleComment({
      articleId,
      commentsCount,
    })
  }
}
