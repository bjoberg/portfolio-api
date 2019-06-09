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
 *    responses:
 *      '200':
 *        description: A JSON array of images
 *        content:
 *           application/json:
 *              schema: 
 *                type: array
 *                items: 
 *                  type: string
 */
.get(controller.getAll);

export default imageRouter;