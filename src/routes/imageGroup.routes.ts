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
  .get(controller.list)
  /**
   * @swagger
   * /imageGroups:
   *  delete:
   *    tags:
   *      - Image Groups
   *    description: Delete all imageGroups based on query
   *    parameters:
   *      - $ref: '#/components/parameters/groupId'
   *      - $ref: '#/components/parameters/imageId'
   *    responses:
   *      '200':
   *        description: The number of destroyed rows
   *        schema: 
   *           $ref: '#/definitions/imageGroup'
   */  
  .delete(controller.deleteAll);

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
  .get(controller.get)
  /**
   * @swagger
   * /imageGroup/{id}:
   *  put:
   *    tags:
   *      - Image Groups
   *    description: Update an imageGroup item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the imageGroup to update
   *        required: true
   *        schema:
   *          type: string
   *    requestBody:
   *      description: Image group object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/imageGroup'
   *    responses:
   *      '200':
   *        description: Updated imageGroup item as JSON
   *        schema: 
   *           $ref: '#/definitions/imageGroup'
   */
  .put(controller.update)
  /**
   * @swagger
   * /imageGroup/{id}:
   *  delete:
   *    tags:
   *      - Image Groups
   *    description: Update an imageGroup item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the imageGroup to delete
   *        required: true
   *        schema:
   *          type: string
   *    responses:
   *      '200':
   *        description: The number of destroyed rows
   */
  .delete(controller.delete);

imageGroupRouter.route('/imageGroup')
  /**
   * @swagger
   * /imageGroup:
   *  post:
   *    tags:
   *      - Image Groups
   *    description: Create a new imageGroup
   *    requestBody:
   *      description: Image group object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/imageGroup'
   *    responses:
   *      '201':
   *        description: A JSON array of the created image group
   *        content: 
   *           application/json: {}
   */
  .post(controller.create);

export default imageGroupRouter;