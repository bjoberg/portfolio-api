import { Router } from 'express';
import { ImageController } from '../controllers';

const imageRouter = Router();
const controller = new ImageController();

imageRouter.route('/images')
/**
 * @swagger
 * /images:
 *  get:
 *    tags:
 *      - images
 *    description: Gets all images based on query
 *    parameters:
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
.get(controller.getAll);

export default imageRouter;