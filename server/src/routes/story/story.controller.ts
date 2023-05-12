import { Controller, Get, Param, Query } from '@nestjs/common'
import { CurrentUser } from 'src/common/decorators/user.decorator'
import { UserDto } from 'src/common/dtos/user.dto'
import { ArticleService } from 'src/services/article.service'
import { ArticlesResult } from '../article/schema'
import { StoryQueryDto } from './dtos/story.query.dto'

@Controller('story')
export class StoryController {
  constructor(private readonly articleService: ArticleService) {}

  @Get(':username')
  async getArticles(
    @CurrentUser() user: UserDto,
    @Param('username') username: string,
    @Query() { mode }: StoryQueryDto,
  ) {
    const articlesResult = await this.articleService.getArticles({
      userId: user?.id,
      username,
      mode,
    })

    return new ArticlesResult(articlesResult)
  }
}
