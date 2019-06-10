import { Router } from 'express';
import SequelizeController from '../controllers/sequelize.controller';
import { Model } from 'sequelize';

const imageGroup = require('../database/models').imageGroup;
const imageGroupRouter = Router();
const controller = new SequelizeController(imageGroup as Model);

imageGroupRouter.route('/imageGroups')
/**
 * @swagger
 * /imageGroups:
 *  get:
 *    tags:
 *      - Image Groups
 *    description: Gets all imageGroups based on query
 *    parameters:
 *      - $ref: '#/components/parameters/limit'
 *      - $ref: '#/components/parameters/page'
 *      - $ref: '#/components/parameters/groupId'
*      - $ref: '#/components/parameters/imageId'
 *    responses:
 *      '200':
 *        description: A JSON array of imageGroups
 *        schema: 
 *           $ref: '#/definitions/imageGroup'
 */
.get(controller.list);

imageGroupRouter.route('/imageGroup/:id')
/**
 * @swagger
 * /imageGroup/{id}:
 *  get:
 *    tags:
 *      - Image Groups
 *    description: Find imageGroup by id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id of the imageGroup to return
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: imageGroup item as JSON
 *        schema: 
 *           $ref: '#/definitions/imageGroup'
 *      '404':
 *        description: imageGroup deleted or does not exist
 *        schema: 
 *           $ref: '#/definitions/imageGroup'
 */
.get(controller.get);

export default imageGroupRouter;