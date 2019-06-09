import SwaggerJSDoc from 'swagger-jsdoc';
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
  ],
  components: {
    parameters: {
      thumbnailUrl: {
        in: 'query',
        name: 'thumbnailUrl',
        schema: {
          type: 'string'
        },
        required: false
      },
      imageUrl: {
        in: 'query',
        name: 'imageUrl',
        schema: {
          type: 'string'
        },
        required: false
      },
      title: {
        in: 'query',
        name: 'title',
        schema: {
          type: 'string'
        },
        required: false
      },
      description: {
        in: 'query',
        name: 'description',
        schema: {
          type: 'string'
        },
        required: false
      },
      location: {
        in: 'query',
        name: 'location',
        schema: {
          type: 'string'
        },
        required: false
      }      
    }
  }
};

const swaggerOptions = {
  swaggerDefinition: swaggerDefinition,
  apis: [path.resolve(__dirname, '../routes/*.routes.js')]
};

const swaggerSpec = SwaggerJSDoc(swaggerOptions);
export default swaggerSpec;