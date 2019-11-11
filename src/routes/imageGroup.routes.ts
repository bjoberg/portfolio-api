import { Router, Request, Response, NextFunction } from "express";
import { Model } from "sequelize";
import { OAuth2Client } from "google-auth-library";

import AuthController from "../controllers/auth.controller";
import SequelizeController from "../controllers/sequelize.controller";

const imageGroup = require("../database/models").imageGroup;
const imageGroupRouter = Router();
const controller = new SequelizeController(imageGroup as Model);
const authController = new AuthController(new OAuth2Client());

imageGroupRouter
  .route("/imageGroups")
  /**
   * @swagger
   * /imageGroups:
   *  get:
   *    tags:
   *      - Image Groups
   *    description: Gets all imageGroups based on query
   *    parameters:
   *      - $ref: '#/components/parameters/limit'
   *      - $ref: '#/components/parameters/page'
   *      - $ref: '#/components/parameters/groupId'
   *      - $ref: '#/components/parameters/imageId'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   */
  .get((req: Request, res: Response, next: NextFunction) => controller.list(req, res, next))
  /**
   * @swagger
   * /imageGroups:
   *  delete:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Image Groups
   *    description: Delete all imageGroups based on query
   *    parameters:
   *      - $ref: '#/components/parameters/groupId'
   *      - $ref: '#/components/parameters/imageId'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   *      401:
   *        $ref: '#/components/responses/unauthorized'
   *      403:
   *        $ref: '#/components/responses/forbidden'
   */
  .delete(
    authController.validateRequest,
    (req: Request, res: Response, next: NextFunction) => controller.deleteAll(req, res, next)
  );

imageGroupRouter
  .route("/imageGroup/:id")
  /**
   * @swagger
   * /imageGroup/{id}:
   *  get:
   *    tags:
   *      - Image Groups
   *    description: Find imageGroup by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the imageGroup to return
   *        required: true
   *        schema:
   *          type: string
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   *      404:
   *        $ref: '#/components/responses/notFound'
   */
  .get((req: Request, res: Response, next: NextFunction) => controller.get(req, res, next))
  /**
   * @swagger
   * /imageGroup/{id}:
   *  put:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Image Groups
   *    description: Update an imageGroup item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the imageGroup to update
   *        required: true
   *        schema:
   *          type: string
   *    requestBody:
   *      description: Image group object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/imageGroup'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   *      401:
   *        $ref: '#/components/responses/unauthorized'
   *      403:
   *        $ref: '#/components/responses/forbidden'
   */
  .put(
    authController.validateRequest,
    (req: Request, res: Response, next: NextFunction) => controller.update(req, res, next)
  )
  /**
   * @swagger
   * /imageGroup/{id}:
   *  delete:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Image Groups
   *    description: Update an imageGroup item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the imageGroup to delete
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
  .delete(
    authController.validateRequest,
    (req: Request, res: Response, next: NextFunction) => controller.delete(req, res, next)
  );

imageGroupRouter
  .route("/imageGroup")
  /**
   * @swagger
   * /imageGroup:
   *  post:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Image Groups
   *    description: Create a new imageGroup
   *    requestBody:
   *      description: Image group object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/imageGroup'
   *    responses:
   *      201:
   *        $ref: '#/components/responses/created'
   *      401:
   *        $ref: '#/components/responses/unauthorized'
   *      403:
   *        $ref: '#/components/responses/forbidden'
   */
  .post(
    authController.validateRequest,
    (req: Request, res: Response, next: NextFunction) => controller.create(req, res, next)
  );

export default imageGroupRouter;
