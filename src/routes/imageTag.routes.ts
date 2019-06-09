import { Router } from 'express';
import { ImageTagController } from '../controllers';

const imageTagRouter = Router();
const controller = new ImageTagController();

imageTagRouter.route('/imageTags')
/**
 * @swagger
 * /imageTags:
 *  get:
 *    tags:
 *      - imageTags
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
.get(controller.getAll);

export default imageTagRouter;