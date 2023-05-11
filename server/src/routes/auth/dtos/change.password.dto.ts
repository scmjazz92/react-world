import { IsNotEmpty, IsString } from 'class-validator'

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  readonly currentPassword: string

  @IsNotEmpty()
  @IsString()
  readonly changePassword: string
}
