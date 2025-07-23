const {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Res,
} = require('@nestjs/common');
const { JobsService } = require('./jobs.service');

@Controller('jobs')
class JobsController {
  constructor(jobsService) {
    this.jobsService = jobsService;
  }

  @Get()
  async getAll(@Req() req, @Res() res) {
    const jobs = await this.jobsService.findAll(req.query);
    return res.json(jobs);
  }

  @Get(':id')
  async getOne(@Req() req, @Res() res) {
    const { id } = req.params;
    const job = await this.jobsService.findOne(id);
    if (job) return res.json(job);
    return res.status(404).json({ message: 'Job not found' });
  }

  @Post()
  async create(@Req() req, @Res() res) {
    const job = await this.jobsService.create(req.body);
    return res.status(201).json(job);
  }

  @Put(':id')
  async update(@Req() req, @Res() res) {
    const { id } = req.params;
    const updated = await this.jobsService.update(id, req.body);
    if (updated) return res.json(updated);
    return res.status(404).json({ message: 'Job not found' });
  }

  @Delete(':id')
  async remove(@Req() req, @Res() res) {
    const { id } = req.params;
    const deleted = await this.jobsService.delete(id);
    if (deleted) return res.json({ message: 'Job deleted' });
    return res.status(404).json({ message: 'Job not found' });
  }
}

module.exports = { JobsController };
