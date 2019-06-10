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
 *      - Tags
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
.get(controller.list);

tagRouter.route('/tag/:id')
/**
 * @swagger
 * /tag/{id}:
 *  get:
 *    tags:
 *      - Tags
 *    description: Find tag by id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id of the tag to return
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Tag item as JSON
 *        schema: 
 *           $ref: '#/definitions/tag'
 *      '404':
 *        description: Tag deleted or does not exist
 *        schema: 
 *           $ref: '#/definitions/tag'
 */
.get(controller.get);

export default tagRouter;