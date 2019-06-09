import { Router } from 'express';
import { ImageGroupController } from '../controllers';

const imageGroupRouter = Router();
const controller = new ImageGroupController();

imageGroupRouter.route('/imageGroups')
/**
 * @swagger
 * /imageGroups:
 *  get:
 *    tags:
 *      - imageGroups
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
.get(controller.getAll);

export default imageGroupRouter;