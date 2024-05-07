import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsController } from './app/cats/cats.controller';
import { CatsService } from './app/cats/cats.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './app/auth/auth.module';
import { TransfromInterceptor } from './interceptor/transform.interceptor';

@Module({
  imports: [UsersModule, UsersModule, AuthModule],
  controllers: [CatsController],
  providers: [
    CatsService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransfromInterceptor,
    },
  ],
})

/* apply logger middleware for this module */
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
