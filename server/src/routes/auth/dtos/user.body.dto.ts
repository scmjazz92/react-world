import { PickType } from '@nestjs/mapped-types'
import { UserEntity } from 'src/entities/user'

export class UserBodyDto extends PickType(UserEntity, [
  'username',
  'password',
] as const) {}
