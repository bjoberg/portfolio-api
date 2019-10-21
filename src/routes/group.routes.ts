import { Router } from "express";
import { Model } from "sequelize";
import { OAuth2Client } from "google-auth-library";

import AuthController from "../controllers/auth.controller";
import SequelizeController from "../controllers/sequelize.controller";

const group = require("../database/models").group;
const groupRouter = Router();
const controller = new SequelizeController(group as Model);
const authController = new AuthController(new OAuth2Client());

groupRouter
  .route("/groups")
  /**
   * @swagger
   * /groups:
   *  get:
   *    tags:
   *      - Groups
   *    description: Gets all groups based on query
   *    parameters:
   *      - $ref: '#/components/parameters/limit'
   *      - $ref: '#/components/parameters/page'
   *      - $ref: '#/components/parameters/thumbnailUrl'
   *      - $ref: '#/components/parameters/imageUrl'
   *      - $ref: '#/components/parameters/title'
   *      - $ref: '#/components/parameters/description'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   */
  .get(controller.list)
  /**
   * @swagger
   * /groups:
   *  delete:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Groups
   *    description: Delete all groups based on query
   *    parameters:
   *      - $ref: '#/components/parameters/thumbnailUrl'
   *      - $ref: '#/components/parameters/imageUrl'
   *      - $ref: '#/components/parameters/title'
   *      - $ref: '#/components/parameters/description'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   *      401:
   *        $ref: '#/components/responses/unauthorized'
   *      403:
   *        $ref: '#/components/responses/forbidden'
   */
  .delete(authController.validateRequest, controller.deleteAll);

groupRouter
  .route("/group/:id")
  /**
   * @swagger
   * /group/{id}:
   *  get:
   *    tags:
   *      - Groups
   *    description: Find group by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the group to return
   *        required: true
   *        schema:
   *          type: string
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   *      404:
   *        $ref: '#/components/responses/notFound'
   */
  .get(controller.get)
  /**
   * @swagger
   * /group/{id}:
   *  put:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Groups
   *    description: Update a group item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the group to update
   *        required: true
   *        schema:
   *          type: string
   *    requestBody:
   *      description: Group object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/group'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   *      401:
   *        $ref: '#/components/responses/unauthorized'
   *      403:
   *        $ref: '#/components/responses/forbidden'
   */
  .put(authController.validateRequest, controller.update)
  /**
   * @swagger
   * /group/{id}:
   *  delete:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Groups
   *    description: Delete a group item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the group to delete
   *        required: true
   *        schema:
   *          type: string
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   *      401:
   *        $ref: '#/components/responses/unauthorized'
   *      403:
   *        $ref: '#/components/responses/forbidden'
   */
  .delete(authController.validateRequest, controller.delete);

groupRouter
  .route("/group")
  /**
   * @swagger
   * /group:
   *  post:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Groups
   *    description: Create a new group.
   *    requestBody:
   *      description: Group object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/group'
   *    responses:
   *      201:
   *        $ref: '#/components/responses/created'
   *      401:
   *        $ref: '#/components/responses/unauthorized'
   *      403:
   *        $ref: '#/components/responses/forbidden'
   */
  .post(authController.validateRequest, controller.create);

export default groupRouter;
