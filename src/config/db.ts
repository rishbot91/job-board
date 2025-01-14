import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'job_board',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function testDBConnection(): Promise<void> {
  try {
    await db.getConnection();
    console.log('Connected to MySQL database');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
