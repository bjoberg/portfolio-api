import { Router } from 'express';
import SequelizeController from '../controllers/sequelize.controller';
import { Model } from 'sequelize';

const tag = require('../database/models').tag;
const tagRouter = Router();
const controller = new SequelizeController(tag as Model);

tagRouter.route('/tags')
/**
 * @swagger
 * /tags:
 *  get:
 *    tags:
 *      - tags
 *    description: Gets all tags based on query
 *    parameters:
 *      - $ref: '#/components/parameters/limit'
 *      - $ref: '#/components/parameters/page'
 *      - $ref: '#/components/parameters/title'
 *    responses:
 *      '200':
 *        description: A JSON array of tags
 *        schema: 
 *           $ref: '#/definitions/tag'
 */
.get(controller.getAll);

export default tagRouter;