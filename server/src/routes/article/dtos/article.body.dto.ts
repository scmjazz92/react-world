import { PickType } from '@nestjs/mapped-types'
import { ArticleEntity } from 'src/entities/article'

export class ArticleBodyDto extends PickType(ArticleEntity, [
  'title',
  'body',
  'thumbnail',
] as const) {}
