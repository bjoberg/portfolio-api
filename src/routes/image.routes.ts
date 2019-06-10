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
.get(controller.list);

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
 */
.get(controller.get);

export default imageRouter;