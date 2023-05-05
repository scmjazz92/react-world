import * as path from 'path'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { S3, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { AppError } from 'src/lib/error'

@Injectable()
export class UploadService {
  private readonly awsS3: S3
  readonly S3_BUCKET_NAME: string

  constructor(private readonly configService: ConfigService) {
    this.awsS3 = new S3({
      region: this.configService.get('AWS_S3_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_S3_SECRET_KEY'),
      },
    })
    this.S3_BUCKET_NAME = this.configService.get('AWS_S3_BUCKET_NAME')
  }

  async uploadFileToS3({
    folder,
    files,
  }: {
    folder: string
    files: Express.Multer.File[]
  }) {
    try {
      const file = files[0]
      const key = `${folder}/${Date.now()}_${path.basename(
        file.originalname,
      )}`.replace(/ /g, '')

      const putObject = new PutObjectCommand({
        Bucket: this.S3_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype,
      })

      await this.awsS3.send(putObject)

      return {
        url: this.getAwsS3FileUrl(key),
      }
    } catch (error) {
      throw new AppError('BadRequest')
    }
  }

  async deleteS3Object(key: string) {
    try {
      const deleteObject = new DeleteObjectCommand({
        Bucket: this.S3_BUCKET_NAME,
        Key: key,
      })

      await this.awsS3.send(deleteObject)
    } catch (error) {
      throw new AppError('BadRequest')
    }
  }

  getAwsS3FileUrl(objectKey: string) {
    return `https://${this.S3_BUCKET_NAME}.s3.amazonaws.com/${objectKey}`
  }
}
