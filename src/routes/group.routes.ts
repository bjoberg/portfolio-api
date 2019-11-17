import { Router, Request, Response, NextFunction } from "express";
import { Model } from "sequelize";
import { OAuth2Client } from "google-auth-library";

import AuthController from "../controllers/auth.controller";
import SequelizeController from "../controllers/sequelize.controller";
import ImageController from "../controllers/image.controller";
import SequelizeService from "../services/sequelize.service";

// Initialize router
const groupRouter = Router();

// Initialize models
const group = require("../database/models").group;
const image = require("../database/models").image;

// Initialize controller
const sequelizeController = new SequelizeController(new SequelizeService(group));

// Initialize image controller
const imageController = new ImageController(new SequelizeService(image), group as Model);

// Initialize auth controller
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
  .get((req: Request, res: Response, next: NextFunction) => sequelizeController.list(req, res, next));

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
  .post(
    authController.validateRequest,
    (req: Request, res: Response, next: NextFunction) => sequelizeController.create(req, res, next)
  );

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
  .get((req: Request, res: Response, next: NextFunction) => sequelizeController.get(req, res, next))
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
  .put(
    authController.validateRequest,
    (req: Request, res: Response, next: NextFunction) => sequelizeController.update(req, res, next)
  )
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
  .delete(
    authController.validateRequest,
    (req: Request, res: Response, next: NextFunction) => sequelizeController.delete(req, res, next)
  );

groupRouter
  .route("/group/:id/images")
  /**
   * @swagger
   * /group/{id}/images:
   *  get:
   *    tags:
   *      - Groups
   *    description: Find all images in a group
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the group to get images for
   *        required: true
   *        schema:
   *          type: string
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   *      404:
   *        $ref: '#/components/responses/notFound'
   */
  .get((req: Request, res: Response, next: NextFunction) => imageController.listAllForGroup(req, res, next));

export default groupRouter;
