import { Request, Response, NextFunction } from 'express';
import { JobModel } from '../models/jobModel';

export class JobController {
  static async createJob(req: Request, res: Response, next: NextFunction) {
    try {
      const newJob = await JobModel.create(req.body);
      res.status(201).json(newJob);
    } catch (error) {
      next(error);
    }
  }

  static async getAllJobs(req: Request, res: Response, next: NextFunction) {
    try {
      const jobs = await JobModel.findAll();
      res.status(200).json(jobs);
    } catch (error) {
      next(error);
    }
  }

  static async getJobById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const job = await JobModel.findById(Number(id));
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
      res.status(200).json(job);
    } catch (error) {
      next(error);
    }
  }

  static async updateJob(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updatedJob = await JobModel.update(Number(id), req.body);
      if (!updatedJob) {
        return res.status(404).json({ message: 'Job not found' });
      }
      res.status(200).json(updatedJob);
    } catch (error) {
      next(error);
    }
  }

  static async deleteJob(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const success = await JobModel.delete(Number(id));
      if (!success) {
        return res.status(404).json({ message: 'Job not found' });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
