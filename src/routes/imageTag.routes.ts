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
  .get(controller.list)
  /**
   * @swagger
   * /imageTags:
   *  delete:
   *    tags:
   *      - Image Tags
   *    description: Delete all imageTags based on query
   *    parameters:
   *      - $ref: '#/components/parameters/tagId'
   *      - $ref: '#/components/parameters/imageId'
   *    responses:
   *      '200':
   *        description: The number of destroyed rows
   */  
  .delete(controller.deleteAll);

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
  .get(controller.get)
  /**
   * @swagger
   * /imageTag/{id}:
   *  put:
   *    tags:
   *      - Image Tags
   *    description: Update an imageTag item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the imageTag to update
   *        required: true
   *        schema:
   *          type: string
   *    requestBody:
   *      description: Image tag object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/imageTag'
   *    responses:
   *      '200':
   *        description: Updated imageTag item as JSON
   *        schema: 
   *           $ref: '#/definitions/imageTag'
   */
  .put(controller.update)
  /**
   * @swagger
   * /imageTag/{id}:
   *  delete:
   *    tags:
   *      - Image Tags
   *    description: Update an imageTag item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the imageTag to delete
   *        required: true
   *        schema:
   *          type: string
   *    responses:
   *      '200':
   *        description: The number of destroyed rows
   */
  .delete(controller.delete);

imageTagRouter.route('/imageTag')
  /**
   * @swagger
   * /imageTag:
   *  post:
   *    tags:
   *      - Image Tags
   *    description: Create a new image tag based on query
   *    requestBody:
   *      description: Image tag object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/imageTag'
   *    responses:
   *      '201':
   *        description: A JSON array of the created image tag
   *        content: 
   *           application/json: {}
   */
  .post(controller.create);

export default imageTagRouter;