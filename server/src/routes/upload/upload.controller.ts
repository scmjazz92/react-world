import {
  Controller,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AnyFilesInterceptor } from '@nestjs/platform-express'
import { UploadService } from 'src/services/upload.service'
import { AuthGuard } from '../auth/auth.guard'
import { UploadQueryDto } from './dtos/upload.query.dto'
import { UploadResult } from './schema'

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(
    @Query() { path }: UploadQueryDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const result = await this.uploadService.uploadFileToS3({
      folder: `upload/${path}`,
      files,
    })
    return new UploadResult(result)
  }
}
