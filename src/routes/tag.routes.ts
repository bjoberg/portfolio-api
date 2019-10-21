import { Router } from "express";
import { Model } from "sequelize";
import { OAuth2Client } from "google-auth-library";

import AuthController from "../controllers/auth.controller";
import SequelizeController from "../controllers/sequelize.controller";

const tag = require("../database/models").tag;
const tagRouter = Router();
const controller = new SequelizeController(tag as Model);
const authController = new AuthController(new OAuth2Client());

tagRouter
  .route("/tags")
  /**
   * @swagger
   * /tags:
   *  get:
   *    tags:
   *      - Tags
   *    description: Gets all tags based on query
   *    parameters:
   *      - $ref: '#/components/parameters/limit'
   *      - $ref: '#/components/parameters/page'
   *      - $ref: '#/components/parameters/title'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   */
  .get(controller.list)
  /**
   * @swagger
   * /tags:
   *  delete:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Tags
   *    description: Delete all tags based on query
   *    parameters:
   *      - $ref: '#/components/parameters/title'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   *      401:
   *        $ref: '#/components/responses/unauthorized'
   *      403:
   *        $ref: '#/components/responses/forbidden'
   */
  .delete(authController.validateRequest, controller.deleteAll);

tagRouter
  .route("/tag/:id")
  /**
   * @swagger
   * /tag/{id}:
   *  get:
   *    tags:
   *      - Tags
   *    description: Find tag by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the tag to return
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
   * /tag/{id}:
   *  put:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Tags
   *    description: Update a tag item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the tag to update
   *        required: true
   *        schema:
   *          type: string
   *    requestBody:
   *      description: Tag object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/tag'
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
   * /tag/{id}:
   *  delete:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Tags
   *    description: Delete a tag item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the tag to delete
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

tagRouter
  .route("/tag")
  /**
   * @swagger
   * /tag:
   *  post:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Tags
   *    description: Create a new tag.
   *    requestBody:
   *      description: Tag object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/tag'
   *    responses:
   *      201:
   *        $ref: '#/components/responses/created'
   *      401:
   *        $ref: '#/components/responses/unauthorized'
   *      403:
   *        $ref: '#/components/responses/forbidden'
   */
  .post(authController.validateRequest, controller.create);

export default tagRouter;
