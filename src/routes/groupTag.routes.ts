import { Router } from 'express';
import SequelizeController from '../controllers/sequelize.controller';
import { Model } from 'sequelize';

const groupTag = require('../database/models').groupTag;
const groupTagRouter = Router();
const controller = new SequelizeController(groupTag as Model);

groupTagRouter.route('/groupTags')
  /**
   * @swagger
   * /groupTags:
   *  get:
   *    tags:
   *      - Group Tags
   *    description: Gets all groupTags based on query
   *    parameters:
   *      - $ref: '#/components/parameters/limit'
   *      - $ref: '#/components/parameters/page'
   *      - $ref: '#/components/parameters/groupId'
   *      - $ref: '#/components/parameters/tagId'
   *    responses:
   *      '200':
   *        description: A JSON array of groupTags
   *        schema: 
   *           $ref: '#/definitions/groupTag'
   */
  .get(controller.list)
  /**
   * @swagger
   * /groupTags:
   *  delete:
   *    tags:
   *      - Group Tags
   *    description: Delete all groupTags based on query
   *    parameters:
   *      - $ref: '#/components/parameters/groupId'
   *      - $ref: '#/components/parameters/tagId'
   *    responses:
   *      '200':
   *        description: The number of destroyed rows
   */  
  .delete(controller.deleteAll);


groupTagRouter.route('/groupTag/:id')
  /**
   * @swagger
   * /groupTag/{id}:
   *  get:
   *    tags:
   *      - Group Tags
   *    description: Find groupTag by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the groupTag to return
   *        required: true
   *        schema:
   *          type: string
   *    responses:
   *      '200':
   *        description: groupTag item as JSON
   *        schema: 
   *           $ref: '#/definitions/groupTag'
   *      '404':
   *        description: groupTag deleted or does not exist
   *        schema: 
   *           $ref: '#/definitions/groupTag'
   */
  .get(controller.get)
  /**
   * @swagger
   * /groupTag/{id}:
   *  put:
   *    tags:
   *      - Group Tags
   *    description: Update a groupTag item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the groupTag to update
   *        required: true
   *        schema:
   *          type: string
   *    requestBody:
   *      description: Group tag object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/groupTag'
   *    responses:
   *      '200':
   *        description: Updated groupTag item as JSON
   *        schema: 
   *           $ref: '#/definitions/groupTag'
   */
  .put(controller.update)
  /**
   * @swagger
   * /groupTag/{id}:
   *  delete:
   *    tags:
   *      - Group Tags
   *    description: Update a groupTag item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the groupTag to delete
   *        required: true
   *        schema:
   *          type: string
   *    responses:
   *      '200':
   *        description: The number of destroyed rows
   */
  .delete(controller.delete);

groupTagRouter.route('/groupTag')
  /**
   * @swagger
   * /groupTag:
   *  post:
   *    tags:
   *      - Group Tags
   *    description: Create a new group tag.
   *    requestBody:
   *      description: Group tag object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/groupTag'
   *    responses:
   *      '201':
   *        description: A JSON array of the created group tag
   *        content: 
   *           application/json: {}
   */
  .post(controller.create);

export default groupTagRouter;