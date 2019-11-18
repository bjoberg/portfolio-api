import { Router, Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";

import AuthController from "../controllers/auth.controller";
import ImageController from "../controllers/image.controller";
// import TagController from "../controllers/tag.controller";
import GroupController from "../controllers/group.controller";
import SequelizeService from "../services/sequelize.service";
import GroupService from "../services/group.service";
import ImageService from "../services/image.service";
// import TagService from "../services/tag.service";

// Initialize router
const imageRouter = Router();

// Initialize models
const group = require("../database/models").group;
const image = require("../database/models").image;
// const tag = require("../database/models").tag;
const imageGroup = require("../database/models").imageGroup;
// const groupTag = require("../database/models").groupTag;

// Initialize sequelize service
const sequelizeService = new SequelizeService(image);

// Initialize group controller
const groupService = new GroupService(group, image, imageGroup);
const groupController = new GroupController(sequelizeService, groupService);

// Initialize image controller
const imageService = new ImageService(image, group, imageGroup);
const imageController = new ImageController(sequelizeService, imageService);

// Initialize tag controller
// const tagService = new TagService(tag, group, groupTag);
// const tagController = new TagController(sequelizeService, tagService);

// Initialize auth controller
const authClient = new OAuth2Client();
const authController = new AuthController(authClient);

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
   *      - $ref: '#/components/parameters/query/limit'
   *      - $ref: '#/components/parameters/query/page'
   *      - $ref: '#/components/parameters/query/thumbnailUrl'
   *      - $ref: '#/components/parameters/query/imageUrl'
   *      - $ref: '#/components/parameters/query/title'
   *      - $ref: '#/components/parameters/query/description'
   *      - $ref: '#/components/parameters/query/location'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   */
  .get((req: Request, res: Response, next: NextFunction) => imageController.list(req, res, next));

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
  .post(
    authController.validateRequest,
    (req: Request, res: Response, next: NextFunction) => imageController.create(req, res, next)
  );

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
   *      - $ref: '#/components/parameters/path/imageId'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   *      404:
   *        $ref: '#/components/responses/notFound'
   */
  .get((req: Request, res: Response, next: NextFunction) => imageController.get(req, res, next))
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
   *      - $ref: '#/components/parameters/path/imageId'
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
  .put(
    authController.validateRequest,
    (req: Request, res: Response, next: NextFunction) => imageController.update(req, res, next)
  )
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
   *     - $ref: '#/components/parameters/path/imageId'
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
    (req: Request, res: Response, next: NextFunction) => imageController.delete(req, res, next)
  );


imageRouter
  .route("/image/:id/groups")
  /**
   * @swagger
   * /image/{id}/groups:
   *  get:
   *    tags:
   *      - Images
   *    description: Find all groups associated with an image
   *    parameters:
   *      - $ref: '#/components/parameters/path/imageId'
   *      - $ref: '#/components/parameters/query/limit'
   *      - $ref: '#/components/parameters/query/page'
   *      - $ref: '#/components/parameters/query/thumbnailUrl'
   *      - $ref: '#/components/parameters/query/imageUrl'
   *      - $ref: '#/components/parameters/query/title'
   *      - $ref: '#/components/parameters/query/description'
   *      - $ref: '#/components/parameters/query/location'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   *      404:
   *        $ref: '#/components/responses/notFound'
   */
  .get((req: Request, res: Response, next: NextFunction) => groupController.listGroupsForImage(req, res, next))
  /**
   * @swagger
   * /image/{id}/groups:
   *  post:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Images
   *    description: Associate groups to an image
   *    parameters:
   *      - $ref: '#/components/parameters/path/imageId'
   *      - $ref: '#/components/parameters/query/groupId'
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
    (req: Request, res: Response, next: NextFunction) => groupController.addGroupsToImage(req, res, next)
  )
  /**
   * @swagger
   * /image/{id}/groups:
   *  delete:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Images
   *    description: Remove group associations from an image. This endpoint breaks the image and group association. It does not delete any image or group from the database.
   *    parameters:
   *      - $ref: '#/components/parameters/path/imageId'
   *      - $ref: '#/components/parameters/query/groupId'
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
    (req: Request, res: Response, next: NextFunction) => groupController.removeGroupsFromImage(req, res, next)
  );

export default imageRouter;
