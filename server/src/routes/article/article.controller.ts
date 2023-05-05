import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { CurrentUser } from 'src/common/decorators/user.decorator'
import { CommentBodyDto } from 'src/common/dtos/comment.body.dto'
import { UserDto } from 'src/common/dtos/user.dto'
import { ArticleService } from 'src/services/article.service'
import { CommentSevice } from 'src/services/comment.service'
import { AuthGuard } from '../auth/auth.guard'
import { ArticleBodyDto } from './dtos/article.body.dto'
import {
  ArticleLikeResult,
  ArticleResult,
  ArticlesResult,
  CommentResultSchema,
  CommentsResultSchema,
} from './schema'

@Controller('articles')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly commentService: CommentSevice,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async createArticle(
    @Body() { body, title, thumbnail }: ArticleBodyDto,
    @CurrentUser() user: UserDto,
  ) {
    const articleResult = await this.articleService.createArticle({
      title,
      body,
      thumbnail,
      userId: user?.id,
    })

    return new ArticleResult(articleResult)
  }

  @Get(':articleId')
  async getArticle(
    @CurrentUser() user: UserDto,
    @Param('articleId', ParseIntPipe) articleId: number,
  ) {
    const articleResult = await this.articleService.getArticle({
      articleId,
      userId: user?.id,
    })

    return new ArticleResult(articleResult)
  }

  @Get()
  async getArticles(@CurrentUser() user: UserDto) {
    const articlesResult = await this.articleService.getArticles({
      userId: user?.id,
    })

    return new ArticlesResult(articlesResult)
  }

  @Delete(':articleId')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  async deleteArticle(
    @Param('articleId', ParseIntPipe) articleId: number,
    @CurrentUser() user: UserDto,
  ) {
    await this.articleService.deleteArticle({
      articleId,
      userId: user.id,
    })
  }

  @Patch(':articleId')
  @UseGuards(AuthGuard)
  async updateArticle(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Body() { body, title, thumbnail }: ArticleBodyDto,
    @CurrentUser() user: UserDto,
  ) {
    const articleResult = await this.articleService.updateArticle({
      body,
      title,
      thumbnail,
      articleId,
      userId: user.id,
    })

    return new ArticleResult(articleResult)
  }

  @Post(':articleId/comments')
  @UseGuards(AuthGuard)
  async createComment(
    @CurrentUser() user: UserDto,
    @Body() { text }: CommentBodyDto,
    @Param('articleId', ParseIntPipe) articleId: number,
  ) {
    const commentResult = await this.commentService.createComment({
      userId: user.id,
      articleId,
      text,
    })

    return new CommentResultSchema(commentResult)
  }

  @Get(':articleId/comments')
  async getComments(@Param('articleId', ParseIntPipe) articleId: number) {
    const commentsResult = await this.commentService.getComments(articleId)
    return new CommentsResultSchema(commentsResult)
  }

  @Get(':articleId/comments/:commentId')
  async getComment(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    const commentResult = await this.commentService.getComment({
      commentId,
      articleId,
    })

    return new CommentResultSchema(commentResult)
  }

  @Patch(':articleId/comments/:commentId')
  @UseGuards(AuthGuard)
  async updateComment(
    @CurrentUser() user: UserDto,
    @Body() { text }: CommentBodyDto,
    @Param('articleId', ParseIntPipe) articleId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    const commentResult = await this.commentService.updateComment({
      userId: user.id,
      articleId,
      text,
      commentId,
    })

    return new CommentResultSchema(commentResult)
  }

  @Delete(':articleId/comments/:commentId')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  async deleteComment(
    @CurrentUser() user: UserDto,
    @Param('articleId', ParseIntPipe) articleId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    await this.commentService.deleteComment({
      userId: user.id,
      articleId,
      commentId,
    })
  }

  @Post(':articleId/likes')
  @UseGuards(AuthGuard)
  async likeArticle(
    @Param('articleId', ParseIntPipe) articleId: number,
    @CurrentUser() user: UserDto,
  ) {
    const likeResult = await this.articleService.likeArticle({
      articleId,
      userId: user.id,
    })

    return new ArticleLikeResult(likeResult)
  }

  @Delete(':articleId/likes')
  @UseGuards(AuthGuard)
  async unlikeArticle(
    @CurrentUser() user: UserDto,
    @Param('articleId', ParseIntPipe) articleId: number,
  ) {
    const unlikeResult = await this.articleService.unlikeArticle({
      userId: user.id,
      articleId,
    })

    return new ArticleLikeResult(unlikeResult)
  }
}
