import { Module } from '@nestjs/common'
import { ArticleRepository } from 'src/repositories/article.repository'
import { ArticleService } from 'src/services/article.service'
import { SearchController } from './search.controller'

@Module({
  controllers: [SearchController],
  providers: [ArticleService, ArticleRepository],
  exports: [ArticleService],
})
export class SearchModule {}
