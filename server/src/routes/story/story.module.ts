import { Module } from '@nestjs/common'
import { ArticleRepository } from 'src/repositories/article.repository'
import { AuthRepository } from 'src/repositories/auth.repository'
import { ArticleService } from 'src/services/article.service'
import { StoryController } from './story.controller'

@Module({
  controllers: [StoryController],
  providers: [ArticleService, ArticleRepository, AuthRepository],
})
export class StoryModule {}
