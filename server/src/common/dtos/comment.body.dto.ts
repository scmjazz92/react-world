import { PickType } from '@nestjs/mapped-types'
import { CommentEntity } from 'src/entities/comment'

export class CommentBodyDto extends PickType(CommentEntity, [
  'text',
] as const) {}
