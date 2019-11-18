// Set all environment variables
import dotenv from 'dotenv';

try {
  dotenv.config();
} catch (error) {
  console.error('Error: unable to set environment variables.');
}

import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import {
  groupRouter,
  imageRouter,
  tagRouter,
  userRouter
} from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import mapKeys from 'lodash/mapKeys';
import ApiError from './utils/models/api-error.interface';
// @ts-ignore
import { sequelize } from './database/models';
// @ts-ignore
import definition from 'sequelize-json-schema';

const port = process.env.PORT !== undefined ? process.env.PORT : 5000;
const app = express();

// Parse body params and attach them to the req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Compress response body for all requests
app.use(compression());

// Secure app by setting various http headers
app.use(helmet());

// Configure swagger UI for route interaction
let swaggerSpecDefinitions: any = {};

mapKeys(sequelize.models, (model, key) => {
  swaggerSpecDefinitions[key] = definition(model)
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(
  { ...swaggerSpec, definitions: swaggerSpecDefinitions },
  false,
  { docExpansion: 'none' }
));

// Initialize endpoints
const baseUrl = '/api/v1';
app.use(baseUrl, imageRouter);
app.use(baseUrl, groupRouter);
app.use(baseUrl, tagRouter);
app.use(baseUrl, userRouter);

// Custom error handler
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.json({
    code: err.status,
    message: err.message
  });
  res.end();
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});