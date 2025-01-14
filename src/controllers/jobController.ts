import { Request, Response, NextFunction, RequestHandler } from 'express';
import { JobModel } from '../models/jobModel';

export class JobController {
  // Create a new job
  static createJob: RequestHandler = async (req, res, next) => {
    try {
      const newJob = await JobModel.create(req.body);
      // No 'return' in front of res
      res.status(201).json(newJob);
    } catch (error) {
      next(error);
    }
  };

  // Retrieve all jobs
  static getAllJobs: RequestHandler = async (req, res, next) => {
    try {
      const jobs = await JobModel.findAll();
      res.status(200).json(jobs);
    } catch (error) {
      next(error);
    }
  };

  // Retrieve a specific job by ID
  static getJobById: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const job = await JobModel.findById(Number(id));
      if (!job) {
        res.status(404).json({ message: 'Job not found' });
        return;
      }
      res.status(200).json(job);
    } catch (error) {
      next(error);
    }
  };

  // Update a job by ID
  static updateJob: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedJob = await JobModel.update(Number(id), req.body);
      if (!updatedJob) {
        res.status(404).json({ message: 'Job not found' });
        return;
      }
      res.status(200).json(updatedJob);
    } catch (error) {
      next(error);
    }
  };

  // Delete a job by ID
  static deleteJob: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const success = await JobModel.delete(Number(id));
      if (!success) {
        res.status(404).json({ message: 'Job not found' });
        return;
      }
      res.status(204).send(); // No content
    } catch (error) {
      next(error);
    }
  };
}
