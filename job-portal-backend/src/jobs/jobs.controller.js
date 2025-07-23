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
  async getAll(req, res) {
    const query = req.query;
    const jobs = await this.jobsService.findAll(query);
    return res.json(jobs);
  }

  @Get(':id')
  async getOne(req, res) {
    const { id } = req.params;
    const job = await this.jobsService.findOne(id);
    if (job) return res.json(job);
    return res.status(404).json({ message: 'Job not found' });
  }

  @Post()
  async create(req, res) {
    const job = await this.jobsService.create(req.body);
    return res.status(201).json(job);
  }

  @Put(':id')
  async update(req, res) {
    const { id } = req.params;
    const updated = await this.jobsService.update(id, req.body);
    if (updated) return res.json(updated);
    return res.status(404).json({ message: 'Job not found' });
  }

  @Delete(':id')
  async remove(req, res) {
    const { id } = req.params;
    const deleted = await this.jobsService.delete(id);
    if (deleted) return res.json({ message: 'Job deleted' });
    return res.status(404).json({ message: 'Job not found' });
  }
}

module.exports = { JobsController };
