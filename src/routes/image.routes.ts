import { Router } from "express";
import { Model } from "sequelize";
import { OAuth2Client } from "google-auth-library";

import AuthController from "../controllers/auth.controller";
import SequelizeController from "../controllers/sequelize.controller";

const image = require("../database/models").image;
const imageRouter = Router();
const controller = new SequelizeController(image as Model);
const authController = new AuthController(new OAuth2Client());

imageRouter
  .route("/images")
  /**
   * @swagger
   * /images:
   *  get:
   *    tags:
   *      - Images
   *    description: Gets all images based on query
   *    parameters:
   *      - $ref: '#/components/parameters/limit'
   *      - $ref: '#/components/parameters/page'
   *      - $ref: '#/components/parameters/thumbnailUrl'
   *      - $ref: '#/components/parameters/imageUrl'
   *      - $ref: '#/components/parameters/title'
   *      - $ref: '#/components/parameters/description'
   *      - $ref: '#/components/parameters/location'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   */
  .get(controller.list)
  /**
   * @swagger
   * /images:
   *  delete:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Images
   *    description: Delete all images based on query
   *    parameters:
   *      - $ref: '#/components/parameters/thumbnailUrl'
   *      - $ref: '#/components/parameters/imageUrl'
   *      - $ref: '#/components/parameters/title'
   *      - $ref: '#/components/parameters/description'
   *      - $ref: '#/components/parameters/location'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   *      401:
   *        $ref: '#/components/responses/unauthorized'
   *      403:
   *        $ref: '#/components/responses/forbidden'
   */
  .delete(authController.validateRequest, controller.deleteAll);

imageRouter
  .route("/image/:id")
  /**
   * @swagger
   * /image/{id}:
   *  get:
   *    tags:
   *      - Images
   *    description: Find image by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the image to return
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
   * /image/{id}:
   *  put:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Images
   *    description: Update an image item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the image to update
   *        required: true
   *        schema:
   *          type: string
   *    requestBody:
   *      description: Image object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/image'
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
   * /image/{id}:
   *  delete:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Images
   *    description: Delete an image item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the image to delete
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

imageRouter
  .route("/image")
  /**
   * @swagger
   * /image:
   *  post:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Images
   *    description: Create a new image
   *    requestBody:
   *      description: Image object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/image'
   *    responses:
   *      201:
   *        $ref: '#/components/responses/created'
   *      401:
   *        $ref: '#/components/responses/unauthorized'
   *      403:
   *        $ref: '#/components/responses/forbidden'
   */
  .post(authController.validateRequest, controller.create);

export default imageRouter;
