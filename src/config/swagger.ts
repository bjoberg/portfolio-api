import SwaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { SORT } from "../utils/models/defaults";

const swaggerDefinition = {
  openapi: "3.0.1",
  info: {
    title: "Brett Oberg Studio API",
    description: "API for working with Brett Oberg Studio, LLC portfolio data",
    version: "1.0.0"
  },
  servers: [
    {
      url: "/api/v1"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer"
      }
    },
    parameters: {
      query: {
        imageId: {
          in: "query",
          name: "imageId",
          description: "id of an image object",
          schema: {
            type: "array",
            items: {
              type: "uuid"
            },
            minItems: 0
          },
          required: false
        },
        groupId: {
          in: "query",
          name: "groupId",
          description: "id of a group object",
          schema: {
            type: "array",
            items: {
              type: "uuid"
            },
            minItems: 0
          },
          required: false
        },
        tagId: {
          in: "query",
          name: "tagId",
          description: "id of a tag object",
          schema: {
            type: "array",
            items: {
              type: "uuid"
            },
            minItems: 0
          },
          required: false
        },
        limit: {
          in: "query",
          name: "limit",
          description:
            "Limits the amount of items returned. [Default: limit = 30]",
          schema: {
            type: "integer"
          },
          required: false
        },
        page: {
          in: "query",
          name: "page",
          description:
            "Get items for a defined range, based on the limit. [Default: page = 0]",
          schema: {
            type: "integer"
          },
          required: false
        },
        thumbnailUrl: {
          in: "query",
          name: "thumbnailUrl",
          schema: {
            type: "string"
          },
          required: false
        },
        imageUrl: {
          in: "query",
          name: "imageUrl",
          schema: {
            type: "string"
          },
          required: false
        },
        title: {
          in: "query",
          name: "title",
          schema: {
            type: "string"
          },
          required: false
        },
        description: {
          in: "query",
          name: "description",
          schema: {
            type: "string"
          },
          required: false
        },
        location: {
          in: "query",
          name: "location",
          schema: {
            type: "string"
          },
          required: false
        },
        captureDate: {
          in: "query",
          name: "captureDate",
          schema: {
            type: "string"
          },
          required: false
        },
        imageListSort: {
          in: 'query',
          name: 'sort',
          description: 'Sort field and direction',
          schema: {
            type: "string",
            enum: [
              `title${SORT.SPLITTER}${SORT.ASCENDING}`,
              `title${SORT.SPLITTER}${SORT.DESCENDING}`,
              `description${SORT.SPLITTER}${SORT.ASCENDING}`,
              `description${SORT.SPLITTER}${SORT.DESCENDING}`,
              `captureDate${SORT.SPLITTER}${SORT.ASCENDING}`,
              `captureDate${SORT.SPLITTER}${SORT.DESCENDING}`,
              `createdAt${SORT.SPLITTER}${SORT.ASCENDING}`,
              `createdAt${SORT.SPLITTER}${SORT.DESCENDING}`,
            ]
          }
        },
        groupListSort: {
          in: 'query',
          name: 'sort',
          description: 'Sort field and direction',
          schema: {
            type: "string",
            enum: [
              `title${SORT.SPLITTER}${SORT.ASCENDING}`,
              `title${SORT.SPLITTER}${SORT.DESCENDING}`,
              `description${SORT.SPLITTER}${SORT.ASCENDING}`,
              `description${SORT.SPLITTER}${SORT.DESCENDING}`,
              `createdAt${SORT.SPLITTER}${SORT.ASCENDING}`,
              `createdAt${SORT.SPLITTER}${SORT.DESCENDING}`,
            ]
          }
        },
        tagListSort: {
          in: 'query',
          name: 'sort',
          description: 'Sort field and direction',
          schema: {
            type: "string",
            enum: [
              `title${SORT.SPLITTER}${SORT.ASCENDING}`,
              `title${SORT.SPLITTER}${SORT.DESCENDING}`,
              `createdAt${SORT.SPLITTER}${SORT.ASCENDING}`,
              `createdAt${SORT.SPLITTER}${SORT.DESCENDING}`,
            ]
          }
        },
      },
      path: {
        imageId: {
          in: "path",
          name: "id",
          description: 'id of the image',
          required: true,
          schema: {
            type: 'string'
          }
        },
        groupId: {
          in: "path",
          name: "id",
          description: 'id of the group',
          required: true,
          schema: {
            type: 'string'
          }
        },
        tagId: {
          in: "path",
          name: "id",
          description: 'id of the tag',
          required: true,
          schema: {
            type: 'string'
          }
        }
      }
    },
    responses: {
      ok: { description: "OK" },
      created: { description: "Resouce has been created" },
      forbidden: { description: "Invalid token" },
      unauthorized: {
        description: "User does not have access to this resource"
      },
      notFound: {
        description: "Entity does not exist"
      }
    }
  }
};

const swaggerOptions = {
  swaggerDefinition: swaggerDefinition,
  apis: [path.resolve(__dirname, "../routes/*.routes.js")]
};

const swaggerSpec = SwaggerJSDoc(swaggerOptions);
export default swaggerSpec;
