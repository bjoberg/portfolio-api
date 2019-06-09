import bodyParser from 'body-parser';
import compression from 'compression';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import { imageRouter } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './config/swagger';
import SwaggerJSDoc from 'swagger-jsdoc';
// import mapKeys from 'lodash/mapKeys';
// import { sequelize } from './database/models';

try {
  dotenv.config();
} catch (error) {
  console.error('Error: unable to set environment variables.');
}

const port = process.env.PORT !== undefined ? process.env.PORT : 5000;
const app = express();

// Parse body params and attach them to the req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Compress response body for all requests
app.use(compression());

// Secure app by setting various http headers
app.use(helmet());

// Setup swagger UI for route interaction
let swaggerSpecDefinitions = {};
// mapKeys(sequelize.models, (model, key) => (swaggerSpecDefinitions[key] = definition(model)));
const swaggerSpec = SwaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(
  {...swaggerSpec, definitions: swaggerSpecDefinitions},
  false,
  {docExpansion: 'none'}
));

// Image routes
app.use('/api/v1', imageRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});