const {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} = require('@nestjs/common');
const { JobsService } = require('./jobs.service');

@Controller('jobs')
class JobsController {
  constructor(jobsService) {
    this.jobsService = jobsService;
  }

  @Get()
  async getAll(@Query() query) {
    return this.jobsService.findAll(query);
  }

  @Get(':id')
  async getOne(@Param('id') id) {
    const job = await this.jobsService.findOne(id);
    if (!job) {
      return { message: 'Job not found' };
    }
    return job;
  }

  @Post()
  async create(@Body() body) {
    return this.jobsService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() body) {
    const updated = await this.jobsService.update(id, body);
    if (!updated) {
      return { message: 'Job not found' };
    }
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    const deleted = await this.jobsService.delete(id);
    if (!deleted) {
      return { message: 'Job not found' };
    }
    return { message: 'Job deleted' };
  }
}

module.exports = { JobsController };
