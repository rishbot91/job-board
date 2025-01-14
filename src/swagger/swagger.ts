import path from 'path';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Board API',
      version: '1.0.0',
      description: 'API documentation for the Job Board service'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: [path.join(__dirname, '../routes/*.ts')],
};
