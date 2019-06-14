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
   *      - Groups
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
   */
  .get(controller.list)
  /**
   * @swagger
   * /groups:
   *  delete:
   *    tags:
   *      - Groups
   *    description: Delete all groups based on query
   *    parameters:
   *      - $ref: '#/components/parameters/thumbnailUrl'
   *      - $ref: '#/components/parameters/imageUrl'
   *      - $ref: '#/components/parameters/title'
   *      - $ref: '#/components/parameters/description'
   *    responses:
   *      '200':
   *        description: The number of destroyed rows
   */  
  .delete(controller.deleteAll);

groupRouter.route('/group/:id')
  /**
   * @swagger
   * /group/{id}:
   *  get:
   *    tags:
   *      - Groups
   *    description: Find group by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the group to return
   *        required: true
   *        schema:
   *          type: string
   *    responses:
   *      '200':
   *        description: Group item as JSON
   *        schema: 
   *           $ref: '#/definitions/group'
   *      '404':
   *        description: Group deleted or does not exist
   *        schema: 
   *           $ref: '#/definitions/group'
   */
  .get(controller.get)
  /**
   * @swagger
   * /group/{id}:
   *  put:
   *    tags:
   *      - Groups
   *    description: Update a group item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the group to update
   *        required: true
   *        schema:
   *          type: string
   *    requestBody:
   *      description: Group object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/group'
   *    responses:
   *      '200':
   *        description: Updated group item as JSON
   *        schema: 
   *           $ref: '#/definitions/group'
   */
  .put(controller.update)
  /**
   * @swagger
   * /group/{id}:
   *  delete:
   *    tags:
   *      - Groups
   *    description: Delete a group item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the group to delete
   *        required: true
   *        schema:
   *          type: string
   *    responses:
   *      '200':
   *        description: The number of destroyed rows
   */
  .delete(controller.delete);

groupRouter.route('/group')
  /**
   * @swagger
   * /group:
   *  post:
   *    tags:
   *      - Groups
   *    description: Create a new group.
   *    requestBody:
   *      description: Group object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/group'
   *    responses:
   *      '201':
   *        description: A JSON array of the created group
   *        content: 
   *           application/json: {}
   */
  .post(controller.create);

export default groupRouter;