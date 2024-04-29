import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception-filter/http-exception.filter';

async function bootstrap() {
  // create the app
  const app = await NestFactory.create(AppModule);

  //  exception filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // listen on port 4000
  await app.listen(4000);
}

// start the app
bootstrap();
