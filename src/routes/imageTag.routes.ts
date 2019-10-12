import { Router } from "express";
import { Model } from "sequelize";
import { OAuth2Client } from "google-auth-library";

import AuthController from "../controllers/auth.controller";
import SequelizeController from "../controllers/sequelize.controller";

const imageTag = require("../database/models").imageTag;
const imageTagRouter = Router();
const controller = new SequelizeController(imageTag as Model);
const authController = new AuthController(new OAuth2Client());

imageTagRouter
  .route("/imageTags")
  /**
   * @swagger
   * /imageTags:
   *  get:
   *    tags:
   *      - Image Tags
   *    description: Gets all imageTags based on query
   *    parameters:
   *      - $ref: '#/components/parameters/limit'
   *      - $ref: '#/components/parameters/page'
   *      - $ref: '#/components/parameters/tagId'
   *      - $ref: '#/components/parameters/imageId'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   */
  .get(controller.list)
  /**
   * @swagger
   * /imageTags:
   *  delete:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Image Tags
   *    description: Delete all imageTags based on query
   *    parameters:
   *      - $ref: '#/components/parameters/tagId'
   *      - $ref: '#/components/parameters/imageId'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   *      401:
   *        $ref: '#/components/responses/unauthorized'
   *      403:
   *        $ref: '#/components/responses/forbidden'
   */

  .delete(authController.validateRequest, controller.deleteAll);

imageTagRouter
  .route("/imageTag/:id")
  /**
   * @swagger
   * /imageTag/{id}:
   *  get:
   *    tags:
   *      - Image Tags
   *    description: Find imageTag by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the imageTag to return
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
   * /imageTag/{id}:
   *  put:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Image Tags
   *    description: Update an imageTag item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the imageTag to update
   *        required: true
   *        schema:
   *          type: string
   *    requestBody:
   *      description: Image tag object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/imageTag'
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
   * /imageTag/{id}:
   *  delete:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Image Tags
   *    description: Update an imageTag item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the imageTag to delete
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

imageTagRouter
  .route("/imageTag")
  /**
   * @swagger
   * /imageTag:
   *  post:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Image Tags
   *    description: Create a new image tag based on query
   *    requestBody:
   *      description: Image tag object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/imageTag'
   *    responses:
   *      201:
   *        $ref: '#/components/responses/created'
   *      401:
   *        $ref: '#/components/responses/unauthorized'
   *      403:
   *        $ref: '#/components/responses/forbidden'
   */
  .post(authController.validateRequest, controller.create);

export default imageTagRouter;
