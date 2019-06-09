import { Router } from 'express';
import { GroupController } from '../controllers';

const groupRouter = Router();
const controller = new GroupController();

groupRouter.route('/groups')
/**
 * @swagger
 * /groups:
 *  get:
 *    tags:
 *      - groups
 *    description: Gets all groups based on query
 *    parameters:
 *      - $ref: '#/components/parameters/thumbnailUrl'
 *      - $ref: '#/components/parameters/imageUrl'
 *      - $ref: '#/components/parameters/title'
 *      - $ref: '#/components/parameters/description'
 *    responses:
 *      '200':
 *        description: A JSON array of groups
 *        schema: 
 *           $ref: '#/definitions/group'
 */
.get(controller.getAll);

export default groupRouter;