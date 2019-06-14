import { Router } from 'express';
import SequelizeController from '../controllers/sequelize.controller';
import { Model } from 'sequelize';

const image = require('../database/models').image;
const imageRouter = Router();
const controller = new SequelizeController(image as Model);

imageRouter.route('/images')
  /**
   * @swagger
   * /images:
   *  get:
   *    tags:
   *      - Images
   *    description: Gets all images based on query
   *    parameters:
   *      - $ref: '#/components/parameters/limit'
   *      - $ref: '#/components/parameters/page'
   *      - $ref: '#/components/parameters/thumbnailUrl'
   *      - $ref: '#/components/parameters/imageUrl'
   *      - $ref: '#/components/parameters/title'
   *      - $ref: '#/components/parameters/description'
   *      - $ref: '#/components/parameters/location'
   *    responses:
   *      '200':
   *        description: A JSON array of images
   *        schema: 
   *           $ref: '#/definitions/image'
   */
  .get(controller.list)
  /**
   * @swagger
   * /images:
   *  delete:
   *    tags:
   *      - Images
   *    description: Delete all images based on query
   *    parameters:
   *      - $ref: '#/components/parameters/thumbnailUrl'
   *      - $ref: '#/components/parameters/imageUrl'
   *      - $ref: '#/components/parameters/title'
   *      - $ref: '#/components/parameters/description'
   *      - $ref: '#/components/parameters/location'
   *    responses:
   *      '200':
   *        description: The number of destroyed rows
   */  
  .delete(controller.deleteAll);

imageRouter.route('/image/:id')
  /**
   * @swagger
   * /image/{id}:
   *  get:
   *    tags:
   *      - Images
   *    description: Find image by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the image to return
   *        required: true
   *        schema:
   *          type: string
   *    responses:
   *      '200':
   *        description: Image item as JSON
   *        schema: 
   *           $ref: '#/definitions/image'
   *      '404':
   *        description: Image deleted or does not exist
   *        schema: 
   *           $ref: '#/definitions/image'
   */
  .get(controller.get)
  /**
   * @swagger
   * /image/{id}:
   *  put:
   *    tags:
   *      - Images
   *    description: Update an image item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the image to update
   *        required: true
   *        schema:
   *          type: string
   *    requestBody:
   *      description: Image object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/image'
   *    responses:
   *      '200':
   *        description: Updated image item as JSON
   *        schema: 
   *           $ref: '#/definitions/image'
   */
  .put(controller.update)
  /**
   * @swagger
   * /image/{id}:
   *  delete:
   *    tags:
   *      - Images
   *    description: Delete an image item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the image to delete
   *        required: true
   *        schema:
   *          type: string
   *    responses:
   *      '200':
   *        description: The number of destroyed rows
   */
  .delete(controller.delete);

imageRouter.route('/image')
  /**
   * @swagger
   * /image:
   *  post:
   *    tags:
   *      - Images
   *    description: Create a new image
   *    requestBody:
   *      description: Image object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/image'
   *    responses:
   *      '201':
   *        description: A JSON array of the created image
   *        content: 
   *           application/json: {}
   */
  .post(controller.create);  

export default imageRouter;