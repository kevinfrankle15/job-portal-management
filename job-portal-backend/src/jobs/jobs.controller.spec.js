import { Test } from '@nestjs/testing';
import { JobsController } from './jobs.controller';

describe('Jobs Controller', () => {
  let controller;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [JobsController],
    }).compile();

    controller = module.get(JobsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
