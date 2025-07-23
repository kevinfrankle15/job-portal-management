const { Controller } = require('@nestjs/common');
const { Request, Response } = require('express');

class JobsController {
  constructor(jobsService) {
    this.jobsService = jobsService;
  }

  async getAll(req, res) {
    try {
      const jobs = await this.jobsService.findAll(req.query);
      res.json(jobs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getOne(req, res) {
    try {
      const job = await this.jobsService.findOne(req.params.id);
      if (!job) return res.status(404).json({ message: 'Job not found' });
      res.json(job);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const job = await this.jobsService.create(req.body);
      res.status(201).json(job);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const job = await this.jobsService.update(req.params.id, req.body);
      if (!job) return res.status(404).json({ message: 'Job not found' });
      res.json(job);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async remove(req, res) {
    try {
      const deleted = await this.jobsService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Job not found' });
      res.json({ message: 'Job deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

const { Router } = require('express');

function createJobsController(jobsService) {
  const controller = new JobsController(jobsService);
  const router = Router();

  router.get('/', controller.getAll.bind(controller));
  router.get('/:id', controller.getOne.bind(controller));
  router.post('/', controller.create.bind(controller));
  router.put('/:id', controller.update.bind(controller));
  router.delete('/:id', controller.remove.bind(controller));

  return router;
}

module.exports = { JobsController, createJobsController };
