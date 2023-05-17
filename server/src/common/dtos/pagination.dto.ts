import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  readonly limit?: number | null

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  readonly cursor?: number | null
}
