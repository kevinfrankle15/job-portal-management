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
const { JobsService } = require('./jobs.service');
// const { JobsController } = require('./jobs.controller');

const JobsModule = Module({
  controllers: [],
  providers: [JobsService],
});

module.exports = { JobsModule };
