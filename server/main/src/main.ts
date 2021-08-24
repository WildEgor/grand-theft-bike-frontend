import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
// import * as fs from 'fs';
import { AppModule } from './app.module';
import express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { InternalServerErrorException } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const configuration = app.get<ConfigService>(ConfigService);

    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded());

    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 10000, // limit each IP to 10000 requests per windowMs
      }),
    );

    app.enableShutdownHooks();

    app.setGlobalPrefix('/api');

    const config = new DocumentBuilder()
      .setTitle('GrandThiefBike Backend')
      .setDescription('Backend API')
      .setVersion('1.0')
      .addTag('gtb')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(configuration.get('port'));

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  } catch (error) {
    // throw new InternalServerErrorException(error);
    process.exit();
  }
}

bootstrap().catch((e) => {
  throw e;
});
