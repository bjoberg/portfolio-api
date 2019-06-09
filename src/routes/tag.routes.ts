import { Router } from 'express';
import { TagController } from '../controllers';

const tagRouter = Router();
const controller = new TagController();

tagRouter.route('/tags')
/**
 * @swagger
 * /tags:
 *  get:
 *    tags:
 *      - tags
 *    description: Gets all tags based on query
 *    parameters:
 *      - $ref: '#/components/parameters/limit'
 *      - $ref: '#/components/parameters/page'
 *      - $ref: '#/components/parameters/title'
 *    responses:
 *      '200':
 *        description: A JSON array of tags
 *        schema: 
 *           $ref: '#/definitions/tag'
 */
.get(controller.getAll);

export default tagRouter;