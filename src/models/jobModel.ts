import { db } from '../config/db';

interface JobData {
  id?: number;
  title: string;
  company: string;
  location: string;
  salary: number;
  description: string;
}

export class JobModel {
  static async create(job: JobData): Promise<JobData> {
    const { title, company, location, salary, description } = job;
    const [result] = await db.query(
      'INSERT INTO jobs (title, company, location, salary, description) VALUES (?, ?, ?, ?, ?)',
      [title, company, location, salary, description]
    );
    const insertId = (result as any).insertId;
    return { id: insertId, ...job };
  }

  static async findAll(): Promise<JobData[]> {
    const [rows] = await db.query('SELECT * FROM jobs');
    return rows as JobData[];
  }

  static async findById(id: number): Promise<JobData | null> {
    const [rows] = await db.query('SELECT * FROM jobs WHERE id = ?', [id]);
    const jobs = rows as JobData[];
    if (jobs.length === 0) {
      return null;
    }
    return jobs[0];
  }

  static async update(id: number, jobData: Partial<JobData>): Promise<JobData | null> {
    const existingJob = await this.findById(id);
    if (!existingJob) return null;

    const updatedFields = {
      title: jobData.title ?? existingJob.title,
      company: jobData.company ?? existingJob.company,
      location: jobData.location ?? existingJob.location,
      salary: jobData.salary ?? existingJob.salary,
      description: jobData.description ?? existingJob.description,
    };

    await db.query(
      'UPDATE jobs SET title = ?, company = ?, location = ?, salary = ?, description = ? WHERE id = ?',
      [
        updatedFields.title,
        updatedFields.company,
        updatedFields.location,
        updatedFields.salary,
        updatedFields.description,
        id,
      ]
    );

    return { id, ...updatedFields };
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await db.query('DELETE FROM jobs WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  }
}
