const express = require('express');

class JobsController {
  constructor(jobsService) {
    this.jobsService = jobsService;
    this.router = express.Router();

    this.router.get('/', this.getAll.bind(this));
    this.router.get('/:id', this.getOne.bind(this));
    this.router.post('/', this.create.bind(this));
    this.router.put('/:id', this.update.bind(this));
    this.router.delete('/:id', this.remove.bind(this));
  }

  async getAll(req, res) {
    try {
      const query = req.query;
      const jobs = await this.jobsService.findAll(query);
      res.json(jobs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getOne(req, res) {
    try {
      const id = req.params.id;
      const job = await this.jobsService.findOne(id);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
      res.json(job);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const body = req.body;
      const created = await this.jobsService.create(body);
      res.status(201).json(created);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const updated = await this.jobsService.update(id, body);
      if (!updated) {
        return res.status(404).json({ message: 'Job not found' });
      }
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async remove(req, res) {
    try {
      const id = req.params.id;
      const deleted = await this.jobsService.delete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Job not found' });
      }
      res.json({ message: 'Job deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = { JobsController };
