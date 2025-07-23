import axios from 'axios';

// const API_BASE_URL = 'http://localhost:3000'; // Update this to your backend URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL||'http://localhost:3000';

export interface Job {
  id: number;
  title: string;
  company_name: string;
  location: string;
  job_type: string;
  salary_min?: number;
  salary_max?: number;
  description: string;
  application_deadline?: string;
  requirements?: string;
  responsibilities?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateJobRequest {
  title: string;
  company_name: string;
  location: string;
  job_type: string;
  salary_min?: number;
  salary_max?: number;
  description: string;
  application_deadline?: string;
  requirements?: string;
  responsibilities?: string;
}

export interface JobsQuery {
  title?: string;
  location?: string;
  job_type?: string;
}

class JobsApi {
  private api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async getAllJobs(query?: JobsQuery): Promise<Job[]> {
    const response = await this.api.get('/jobs', { params: query });
    return response.data;
  }

  async getJobById(id: number): Promise<Job> {
    const response = await this.api.get(`/jobs/${id}`);
    return response.data;
  }

  async createJob(job: CreateJobRequest): Promise<Job> {
    const response = await this.api.post('/jobs', job);
    return response.data;
  }

  async updateJob(id: number, job: Partial<CreateJobRequest>): Promise<Job> {
    const response = await this.api.put(`/jobs/${id}`, job);
    return response.data;
  }

  async deleteJob(id: number): Promise<boolean> {
    const response = await this.api.delete(`/jobs/${id}`);
    return response.status === 200;
  }
}

export const jobsApi = new JobsApi();