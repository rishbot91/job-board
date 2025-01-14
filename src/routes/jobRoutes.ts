import { Router } from 'express';
import { JobController } from '../controllers/jobController';

export const jobRouter = Router();

// Create a new job
jobRouter.post('/', JobController.createJob);

// Retrieve all jobs
jobRouter.get('/', JobController.getAllJobs);

// Retrieve a specific job by ID
jobRouter.get('/:id', JobController.getJobById);

// Update a job by ID
jobRouter.put('/:id', JobController.updateJob);

// Delete a job by ID
jobRouter.delete('/:id', JobController.deleteJob);
