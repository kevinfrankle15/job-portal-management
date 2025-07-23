import { Test } from '@nestjs/testing';
import { JobsService } from './jobs.service';

describe('JobsService', () => {
  let service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [JobsService],
    }).compile();

    service = module.get(JobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
