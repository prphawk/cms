import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from './all_exceptions.filter'
import { AppModule } from './app.module';
import { env } from 'process'

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   const PORT = process.env.PORT || 3001;

   app.useGlobalPipes(
      new ValidationPipe({
         // whitelist: true,
         // skipUndefinedProperties: true
         transform: true,
         //transformOptions: { enableImplicitConversion: true },
      }),
   );

   app.enableCors();
   // const { httpAdapter } = app.get(HttpAdapterHost);
   // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
   await app.listen(PORT);
}

if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config();
}

bootstrap();
