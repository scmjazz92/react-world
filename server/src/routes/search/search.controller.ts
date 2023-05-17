import { Controller, Get, Query } from '@nestjs/common'
import { CurrentUser } from 'src/common/decorators/user.decorator'
import { PaginationDto } from 'src/common/dtos/pagination.dto'
import { UserDto } from 'src/common/dtos/user.dto'
import { ArticleService } from 'src/services/article.service'
import { ArticlesResult } from '../article/schema'
import { SearchQueryDto } from './dtos/search.query.dto'

@Controller('search')
export class SearchController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async getArticles(
    @CurrentUser() user: UserDto,
    @Query() { value }: SearchQueryDto,
    @Query() { limit, cursor }: PaginationDto,
  ) {
    const articlesResult = await this.articleService.getArticles({
      userId: user?.id,
      value,
      limit,
      cursor,
    })

    return new ArticlesResult(articlesResult)
  }
}
