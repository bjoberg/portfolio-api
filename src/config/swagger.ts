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
      limit: {
        in: 'query',
        name: 'limit',
        description: 'Limits the amount of items returned. [Default: limit = 30]',
        schema: {
          type: 'integer'
        },
        required: false
      },
      page: {
        in: 'query',
        name: 'page',
        description: 'Get items for a defined range, based on the limit. [Default: page = 0]',
        schema: {
          type: 'integer'
        },
        required: false
      },      
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
      },
      groupId: {
        in: 'query',
        name: 'groupId',
        schema: {
          type: 'uuid'
        },
        required: false
      },
      groupTagId: {
        in: 'query',
        name: 'groupTagId',
        schema: {
          type: 'uuid'
        },
        required: false
      }, 
      imageId: {
        in: 'query',
        name: 'imageId',
        schema: {
          type: 'uuid'
        },
        required: false
      },
      imageGroupId: {
        in: 'query',
        name: 'imageGroupId',
        schema: {
          type: 'uuid'
        },
        required: false
      },
      imageTagId: {
        in: 'query',
        name: 'imageTagId',
        schema: {
          type: 'uuid'
        },
        required: false
      },
      tagId: {
        in: 'query',
        name: 'tagId',
        schema: {
          type: 'uuid'
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