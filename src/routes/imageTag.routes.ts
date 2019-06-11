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
   *      - Image Tags
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

imageTagRouter.route('/imageTag/:id')
  /**
   * @swagger
   * /imageTag/{id}:
   *  get:
   *    tags:
   *      - Image Tags
   *    description: Find imageTag by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the imageTag to return
   *        required: true
   *        schema:
   *          type: string
   *    responses:
   *      '200':
   *        description: imageTag item as JSON
   *        schema: 
   *           $ref: '#/definitions/imageTag'
   *      '404':
   *        description: imageTag deleted or does not exist
   *        schema: 
   *           $ref: '#/definitions/imageTag'
   */
  .get(controller.get);

export default imageTagRouter;