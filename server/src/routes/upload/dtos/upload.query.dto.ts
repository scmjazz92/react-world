import { IsNotEmpty, IsString } from 'class-validator'

export class UploadQueryDto {
  @IsString()
  @IsNotEmpty()
  readonly path: string
}
