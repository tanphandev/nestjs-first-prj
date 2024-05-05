import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsController } from './app/cats/cats.controller';
import { CatsService } from './app/cats/cats.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/roles.guard';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [UsersModule, UsersModule, AuthModule],
  controllers: [CatsController],
  providers: [
    CatsService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})

/* apply logger middleware for this module */
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
