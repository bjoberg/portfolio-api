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
 *      - imageGroups
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

export default imageGroupRouter;