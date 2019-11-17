import { Router, Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";

import AuthController from "../controllers/auth.controller";
import SequelizeController from "../controllers/sequelize.controller";
import ImageController from "../controllers/image.controller";
import SequelizeService from "../services/sequelize.service";
import ImageService from "../services/image.service";

// Initialize router
const groupRouter = Router();

// Initialize models
const group = require("../database/models").group;
const image = require("../database/models").image;
const imageGroup = require("../database/models").imageGroup;

// Initialize controller
const sequelizeService = new SequelizeService(group);
const sequelizeController = new SequelizeController(sequelizeService);

// Initialize image controller
const imageService = new ImageService(image, group, imageGroup);
const imageController = new ImageController(sequelizeService, imageService);

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
   *      - $ref: '#/components/parameters/query/limit'
   *      - $ref: '#/components/parameters/query/page'
   *      - $ref: '#/components/parameters/query/thumbnailUrl'
   *      - $ref: '#/components/parameters/query/imageUrl'
   *      - $ref: '#/components/parameters/query/title'
   *      - $ref: '#/components/parameters/query/description'
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
   *      - $ref: '#/components/parameters/path/groupId'
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
   *      - $ref: '#/components/parameters/path/groupId'
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
   *      - $ref: '#/components/parameters/path/groupId'
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
   *      - $ref: '#/components/parameters/path/groupId'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   *      404:
   *        $ref: '#/components/responses/notFound'
   */
  .get((req: Request, res: Response, next: NextFunction) => imageController.listImagesForGroup(req, res, next))
  /**
     * @swagger
     * /group/{id}/images:
     *  post:
     *    security:
     *      - bearerAuth: []
     *    tags:
     *      - Groups
     *    description: Add images from a group.
     *    parameters:
     *      - $ref: '#/components/parameters/path/groupId'
     *      - $ref: '#/components/parameters/query/imageId'
     *    responses:
     *      200:
     *        $ref: '#/components/responses/ok'
     *      401:
     *        $ref: '#/components/responses/unauthorized'
     *      403:
     *        $ref: '#/components/responses/forbidden'
     */
  .post(
    authController.validateRequest,
    (req: Request, res: Response, next: NextFunction) => imageController.addImagesToGroup(req, res, next)
  )
  /**
     * @swagger
     * /group/{id}/images:
     *  delete:
     *    security:
     *      - bearerAuth: []
     *    tags:
     *      - Groups
     *    description: Remove images from a group. This endpoint breaks the image and group associations. It does not delete any images from the database.
     *    parameters:
     *      - $ref: '#/components/parameters/path/groupId'
     *      - $ref: '#/components/parameters/query/imageId'
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
    (req: Request, res: Response, next: NextFunction) => imageController.removeImagesFromGroup(req, res, next)
  );

export default groupRouter;
