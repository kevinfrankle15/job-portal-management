// const { Module } = require('@nestjs/common');
// const { ConfigModule, ConfigService } = require('@nestjs/config');
// const { TypeOrmModule } = require('@nestjs/typeorm');
// const { JobsModule } = require('./jobs/jobs.module');

// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: (configService) => ({
//         type: 'postgres',
//         url: configService.get('DATABASE_URL'),
//         ssl: { rejectUnauthorized: false }, // needed for Render.com
//         autoLoadEntities: true,
//         synchronize: true, // disable in production
//       }),
//       inject: [ConfigService],
//     }),
//     JobsModule,
//   ],
// })
// class AppModule {}

// module.exports = { AppModule };
const { Module } = require('@nestjs/common');
const { ConfigModule, ConfigService } = require('@nestjs/config');
const { TypeOrmModule } = require('@nestjs/typeorm');
const { JobsModule } = require('./jobs/jobs.module');

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        ssl: { rejectUnauthorized: false }, // needed for Render.com
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    JobsModule,
  ],
})
class AppModule {}

module.exports = { AppModule };
