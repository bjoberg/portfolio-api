import { Router } from 'express';
import SequelizeController from '../controllers/sequelize.controller';
import { Model } from 'sequelize';

const imageTag = require('../database/models').imageTag;
const imageTagRouter = Router();
const controller = new SequelizeController(imageTag as Model);

imageTagRouter.route('/imageTags')
/**
 * @swagger
 * /imageTags:
 *  get:
 *    tags:
 *      - imageTags
 *    description: Gets all imageTags based on query
 *    parameters:
 *      - $ref: '#/components/parameters/limit'
 *      - $ref: '#/components/parameters/page'
 *      - $ref: '#/components/parameters/tagId'
*      - $ref: '#/components/parameters/imageId'
 *    responses:
 *      '200':
 *        description: A JSON array of imageTags
 *        schema: 
 *           $ref: '#/definitions/imageTag'
 */
.get(controller.list);

export default imageTagRouter;