import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import { jobRouter } from './routes/jobRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { swaggerOptions } from './swagger/swagger';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/jobs', jobRouter);

// Swagger setup
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Error Handler
app.use(errorHandler);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Job Board API is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
