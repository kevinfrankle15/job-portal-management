const {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  Res,
} = require('@nestjs/common');

@Controller('jobs')
class JobsController {
  constructor(jobsService) {
    this.jobsService = jobsService;
  }

  @Get()
  async getAll(@Query() query, @Res() res) {
    try {
      const jobs = await this.jobsService.findAll(query);
      return res.json(jobs);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  @Get(':id')
  async getOne(@Param('id') id, @Res() res) {
    try {
      const job = await this.jobsService.findOne(id);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
      return res.json(job);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  @Post()
  async create(@Body() body, @Res() res) {
    try {
      const job = await this.jobsService.create(body);
      return res.status(201).json(job);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  @Put(':id')
  async update(@Param('id') id, @Body() body, @Res() res) {
    try {
      const updated = await this.jobsService.update(id, body);
      if (!updated) {
        return res.status(404).json({ message: 'Job not found' });
      }
      return res.json(updated);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id, @Res() res) {
    try {
      const deleted = await this.jobsService.delete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Job not found' });
      }
      return res.json({ message: 'Job deleted' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = { JobsController };
