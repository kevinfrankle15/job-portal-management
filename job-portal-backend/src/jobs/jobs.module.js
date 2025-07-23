// const { Module } = require('@nestjs/common');
// const { JobsService } = require('./jobs.service');
// const { JobsController } = require('./jobs.controller');

// @Module({
//   controllers: [JobsController],
//   providers: [JobsService],
// })
// class JobsModule {}

// module.exports = { JobsModule };
const { Module } = require('@nestjs/common');
const JobsService = require('./jobs.service');
const { createJobsController } = require('./jobs.controller');

@Module({
  providers: [JobsService],
})
class JobsModule {
  configure(consumer) {
    const jobsService = new JobsService();
    consumer.apply(createJobsController(jobsService)).forRoutes('jobs');
  }
}

module.exports = { JobsModule };
