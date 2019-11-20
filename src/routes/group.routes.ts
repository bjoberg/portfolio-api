import { Router, Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";

import AuthController from "../controllers/auth.controller";
import ImageController from "../controllers/image.controller";
import TagController from "../controllers/tag.controller";
import GroupController from "../controllers/group.controller";
import SequelizeService from "../services/sequelize.service";
import GroupService from "../services/group.service";
import ImageService from "../services/image.service";
import TagService from "../services/tag.service";

// Initialize router
const groupRouter = Router();

// Initialize models
const group = require("../database/models").group;
const image = require("../database/models").image;
const tag = require("../database/models").tag;
const imageGroup = require("../database/models").imageGroup;
const groupTag = require("../database/models").groupTag;
const imageTag = require("../database/models").imageTag;

// Initialize sequelize service
const sequelizeService = new SequelizeService(group);

// Initialize group controller
const groupService = new GroupService(group, image, imageGroup);
const groupController = new GroupController(sequelizeService, groupService);

// Initialize image controller
const imageService = new ImageService(image, group, imageGroup);
const imageController = new ImageController(sequelizeService, imageService);

// Initialize tag controller
const tagService = new TagService(tag, group, image, groupTag, imageTag);
const tagController = new TagController(sequelizeService, tagService);

// Initialize auth controller
const authClient = new OAuth2Client();
const authController = new AuthController(authClient);

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
  .get((req: Request, res: Response, next: NextFunction) => groupController.list(req, res, next));

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
    (req: Request, res: Response, next: NextFunction) => groupController.create(req, res, next)
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
  .get((req: Request, res: Response, next: NextFunction) => groupController.get(req, res, next))
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
    (req: Request, res: Response, next: NextFunction) => groupController.update(req, res, next)
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
    (req: Request, res: Response, next: NextFunction) => groupController.delete(req, res, next)
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
   *      - $ref: '#/components/parameters/query/limit'
   *      - $ref: '#/components/parameters/query/page'
   *      - $ref: '#/components/parameters/query/thumbnailUrl'
   *      - $ref: '#/components/parameters/query/imageUrl'
   *      - $ref: '#/components/parameters/query/title'
   *      - $ref: '#/components/parameters/query/description'
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
     *    description: Add images to a group.
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
     *    description: Remove images from a group. This endpoint breaks the image and group association. It does not delete any image or group from the database.
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

groupRouter
  .route("/group/:id/tags")
  /**
   * @swagger
   * /group/{id}/tags:
   *  get:
   *    tags:
   *      - Groups
   *    description: Get all tags for a group
   *    parameters:
   *      - $ref: '#/components/parameters/path/groupId'
   *      - $ref: '#/components/parameters/query/limit'
   *      - $ref: '#/components/parameters/query/page'
   *      - $ref: '#/components/parameters/query/title'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   *      404:
   *        $ref: '#/components/responses/notFound'
   */
  .get((req: Request, res: Response, next: NextFunction) => tagController.listTagsForGroup(req, res, next))
  /**
   * @swagger
   * /group/{id}/tags:
   *  post:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Groups
   *    description: Add tags to a group.
   *    parameters:
   *      - $ref: '#/components/parameters/path/groupId'
   *      - $ref: '#/components/parameters/query/tagId'
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
    (req: Request, res: Response, next: NextFunction) => tagController.addTagsToGroup(req, res, next)
  )
  /**
   * @swagger
   * /group/{id}/tags:
   *  delete:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Groups
   *    description: Remove tags from a group. This endpoint breaks the tag and group association. It does not delete any tag or group from the database.
   *    parameters:
   *      - $ref: '#/components/parameters/path/groupId'
   *      - $ref: '#/components/parameters/query/tagId'
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
    (req: Request, res: Response, next: NextFunction) => tagController.removeTagsFromGroup(req, res, next)
  );

export default groupRouter;