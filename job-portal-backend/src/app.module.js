const { Module } = require('@nestjs/common');
const { ConfigModule } = require('@nestjs/config');
const { JobsModule } = require('./jobs/jobs.module');

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), JobsModule],
})
class AppModule {}

module.exports = { AppModule };
