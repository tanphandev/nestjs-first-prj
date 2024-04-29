import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [CatsService],
})

/* apply logger middleware for this module */
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
