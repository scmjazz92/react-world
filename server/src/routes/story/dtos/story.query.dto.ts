import { IsEnum, IsOptional, IsString } from 'class-validator'
import { ArticlesMode } from 'src/lib/types'

export class StoryQueryDto {
  @IsString()
  @IsOptional()
  @IsEnum(['user', 'like'])
  readonly mode?: ArticlesMode | undefined
}
