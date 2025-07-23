const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./app.module');
const express = require('express');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
