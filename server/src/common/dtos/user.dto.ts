import { PickType } from '@nestjs/mapped-types'
import { UserEntity } from 'src/entities/user'

export class UserDto extends PickType(UserEntity, [
  'id',
  'username',
] as const) {}
