import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from "path";
import * as express from 'express';
import config from './config';
import {graphqlUploadExpress} from "graphql-upload";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))
  await app.listen(config.port);
}
bootstrap();
