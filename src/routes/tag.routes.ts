import { Router, Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";

import AuthController from "../controllers/auth.controller";
import SequelizeController from "../controllers/sequelize.controller";
import SequelizeService from "../services/sequelize.service";

// Initialize router
const tagRouter = Router();

// Initialize models
const tag = require("../database/models").tag;

// Initialize sequelize controller
const sequelizeService = new SequelizeService(tag);
const controller = new SequelizeController(sequelizeService);

// Initialize auth controller
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
   *      - $ref: '#/components/parameters/query/limit'
   *      - $ref: '#/components/parameters/query/page'
   *      - $ref: '#/components/parameters/query/title'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   */
  .get((req: Request, res: Response, next: NextFunction) => controller.list(req, res, next));

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
   *      - $ref: '#/components/parameters/path/tagId'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   *      404:
   *        $ref: '#/components/responses/notFound'
   */
  .get((req: Request, res: Response, next: NextFunction) => controller.get(req, res, next))
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
   *      - $ref: '#/components/parameters/path/tagId'
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
  .put(
    authController.validateRequest,
    (req: Request, res: Response, next: NextFunction) => controller.update(req, res, next)
  )
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
   *      - $ref: '#/components/parameters/path/tagId'
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
  .post(
    authController.validateRequest,
    (req: Request, res: Response, next: NextFunction) => controller.create(req, res, next)
  );

export default tagRouter;
