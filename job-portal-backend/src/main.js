// const { NestFactory } = require('@nestjs/core');
// const { AppModule } = require('./app.module');
// const express = require('express');

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.use(express.json());
//   app.enableCors();
//   await app.listen(3000);
// }
// bootstrap();
const express = require('express');
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./app.module');
const { AppService } = require('./app.service');
const { AppController } = require('./app.controller');
const { JobsService } = require('./jobs/jobs.service');
const { JobsController } = require('./jobs/jobs.controller');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.use(express.json());

  // App route
  const appService = new AppService();
  const appController = new AppController(appService);
  expressApp.get('/', appController.getHello.bind(appController));

  // Jobs route
  const jobsService = new JobsService();
  const jobsController = new JobsController(jobsService);
  expressApp.use('/jobs', jobsController.router);

  await app.listen(3000);
  console.log('Server running at http://localhost:3000');
}
bootstrap();
