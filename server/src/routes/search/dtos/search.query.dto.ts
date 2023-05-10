import { IsOptional, IsString } from 'class-validator'

export class SearchQueryDto {
  @IsString()
  @IsOptional()
  readonly value?: string | undefined
}
