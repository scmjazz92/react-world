import { Module } from '@nestjs/common'
import { ArticleRepository } from 'src/repositories/article.repository'
import { AuthRepository } from 'src/repositories/auth.repository'
import { CommentRepository } from 'src/repositories/comment.repository'
import { ArticleService } from 'src/services/article.service'
import { CommentSevice } from 'src/services/comment.service'
import { ArticleController } from './article.controller'

@Module({
  controllers: [ArticleController],
  providers: [
    ArticleService,
    ArticleRepository,
    CommentSevice,
    CommentRepository,
    AuthRepository,
  ],
  exports: [ArticleService],
})
export class ArticleModule {}
