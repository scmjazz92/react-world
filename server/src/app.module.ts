import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerMiddleware } from './common/middlewares/logger.middleware'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './routes/auth/auth.module'
import { ArticleModule } from './routes/article/article.module'
import { UploadModule } from './routes/upload/upload.module'
import { SearchModule } from './routes/search/search.module';
import { StoryModule } from './routes/story/story.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ArticleModule,
    UploadModule,
    SearchModule,
    StoryModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
