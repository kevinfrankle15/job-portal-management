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
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./app.module');
const express = require('express');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Get raw Express instance to mount your routers manually
  const expressApp = app.getHttpAdapter().getInstance();

  expressApp.use(express.json());

  // Import service and controller, instantiate, and mount the router
  const { JobsService } = require('./jobs.service');
  const { JobsController } = require('./jobs.controller');

  const jobsService = new JobsService();
  const jobsController = new JobsController(jobsService);

  expressApp.use('/jobs', jobsController.router);

  await app.listen(3000);
  console.log('Server started on http://localhost:3000');
}
bootstrap();
