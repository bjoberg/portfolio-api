import path from 'path';

const swaggerDefinition = {
  openapi: '3.0.1',
  info: {
    title: 'Brett Oberg Studio API',
    description: 'API for working with Brett Oberg Studio, LLC portfolio data',
    version: '1.0.0'
  },
  servers: [
    {
      url: '/api/v1'
    }
  ]
};

const swaggerOptions = {
  swaggerDefinition: swaggerDefinition,
  apis: [path.resolve(__dirname, '../routes/**/*.js')]
}

export default swaggerOptions;