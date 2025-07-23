const {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  Param,
  Res,
  HttpStatus,
} = require('@nestjs/common');
const { JobsService } = require('./jobs.service');

@Controller('jobs')
class JobsController {
  constructor(jobsService) {
    this.jobsService = jobsService;
  }

  @Get()
  async getAll(@Query() query, @Res() res) {
    const jobs = await this.jobsService.findAll(query);
    return res.status(HttpStatus.OK).json(jobs);
  }

  @Get(':id')
  async getOne(@Param('id') id, @Res() res) {
    const job = await this.jobsService.findOne(id);
    if (job) return res.status(HttpStatus.OK).json(job);
    return res.status(HttpStatus.NOT_FOUND).json({ message: 'Job not found' });
  }

  @Post()
  async create(@Body() body, @Res() res) {
    const job = await this.jobsService.create(body);
    return res.status(HttpStatus.CREATED).json(job);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() body, @Res() res) {
    const updated = await this.jobsService.update(id, body);
    if (updated) return res.status(HttpStatus.OK).json(updated);
    return res.status(HttpStatus.NOT_FOUND).json({ message: 'Job not found' });
  }

  @Delete(':id')
  async remove(@Param('id') id, @Res() res) {
    const deleted = await this.jobsService.delete(id);
    if (deleted)
      return res.status(HttpStatus.OK).json({ message: 'Job deleted' });
    return res.status(HttpStatus.NOT_FOUND).json({ message: 'Job not found' });
  }
}

module.exports = { JobsController };
