import { Injectable } from '@nestjs/common'
import { CommentBodyDto } from 'src/common/dtos/comment.body.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async commentCount(articleId: number) {
    const count = await this.prisma.comment.count({
      where: {
        articleId,
      },
    })
    return count
  }

  async createComment({
    userId,
    articleId,
    text,
  }: CommentBodyDto & { articleId: number; userId: number }) {
    const comment = await this.prisma.comment.create({
      data: {
        text,
        articleId,
        userId,
      },
      include: {
        user: true,
      },
    })

    return comment
  }

  async getComments(articleId: number) {
    const comments = await this.prisma.comment.findMany({
      where: {
        articleId,
      },
      orderBy: {
        id: 'asc',
      },
      include: {
        user: true,
      },
    })

    return comments
  }

  async getComment(commentId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      include: {
        user: true,
      },
    })

    return comment
  }

  async updateComment({
    text,
    commentId,
  }: CommentBodyDto & { commentId: number }) {
    const comment = await this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        text,
      },
      include: {
        user: true,
      },
    })
    return comment
  }

  async deleteComment(commentId: number) {
    await this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    })
  }
}
