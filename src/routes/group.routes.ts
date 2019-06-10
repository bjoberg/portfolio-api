import { Router } from 'express';
import SequelizeController from '../controllers/sequelize.controller';
import { Model } from 'sequelize';

const group = require('../database/models').group;
const groupRouter = Router();
const controller = new SequelizeController(group as Model);

groupRouter.route('/groups')
/**
 * @swagger
 * /groups:
 *  get:
 *    tags:
 *      - groups
 *    description: Gets all groups based on query
 *    parameters:
 *      - $ref: '#/components/parameters/limit'
 *      - $ref: '#/components/parameters/page'
 *      - $ref: '#/components/parameters/thumbnailUrl'
 *      - $ref: '#/components/parameters/imageUrl'
 *      - $ref: '#/components/parameters/title'
 *      - $ref: '#/components/parameters/description'
 *    responses:
 *      '200':
 *        description: A JSON array of groups
 *        schema: 
 *           $ref: '#/definitions/group'
 */
.get(controller.getAll);

export default groupRouter;