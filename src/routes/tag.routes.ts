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
  .get(controller.list)
  /**
   * @swagger
   * /tags:
   *  delete:
   *    tags:
   *      - Tags
   *    description: Delete all tags based on query
   *    parameters:
   *      - $ref: '#/components/parameters/title'
   *    responses:
   *      '200':
   *        description: The number of destroyed rows
   */  
  .delete(controller.deleteAll);

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
  .get(controller.get)
  /**
   * @swagger
   * /tag/{id}:
   *  put:
   *    tags:
   *      - Tags
   *    description: Update a tag item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the tag to update
   *        required: true
   *        schema:
   *          type: string
   *    requestBody:
   *      description: Tag object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/tag'
   *    responses:
   *      '200':
   *        description: Updated tag item as JSON
   *        schema: 
   *           $ref: '#/definitions/tag'
   */
  .put(controller.update)
  /**
   * @swagger
   * /tag/{id}:
   *  delete:
   *    tags:
   *      - Tags
   *    description: Delete a tag item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the tag to delete
   *        required: true
   *        schema:
   *          type: string
   *    responses:
   *      '200':
   *        description: The number of destroyed rows
   */
  .delete(controller.delete);

tagRouter.route('/tag')
  /**
   * @swagger
   * /tag:
   *  post:
   *    tags:
   *      - Tags
   *    description: Create a new tag.
   *    requestBody:
   *      description: Tag object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/tag'
   *    responses:
   *      '201':
   *        description: A JSON array of the created tag
   *        content: 
   *           application/json: {}
   */
  .post(controller.create);

export default tagRouter;