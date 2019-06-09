import { Router } from 'express';
import { GroupTagController } from '../controllers';

const groupTagRouter = Router();
const controller = new GroupTagController();

groupTagRouter.route('/groupTags')
/**
 * @swagger
 * /groupTags:
 *  get:
 *    tags:
 *      - groupTags
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
.get(controller.getAll);

export default groupTagRouter;