import { Router, Request, Response, NextFunction } from "express";
import { Model } from "sequelize";
import { OAuth2Client } from "google-auth-library";

import AuthController from "../controllers/auth.controller";
import SequelizeController from "../controllers/sequelize.controller";

const groupTag = require("../database/models").groupTag;
const groupTagRouter = Router();
const controller = new SequelizeController(groupTag as Model);
const authController = new AuthController(new OAuth2Client());

groupTagRouter
  .route("/groupTags")
  /**
   * @swagger
   * /groupTags:
   *  get:
   *    tags:
   *      - Group Tags
   *    description: Gets all groupTags based on query
   *    parameters:
   *      - $ref: '#/components/parameters/limit'
   *      - $ref: '#/components/parameters/page'
   *      - $ref: '#/components/parameters/groupId'
   *      - $ref: '#/components/parameters/tagId'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   */
  .get((req: Request, res: Response, next: NextFunction) => controller.list(req, res, next))
  /**
   * @swagger
   * /groupTags:
   *  delete:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Group Tags
   *    description: Delete all groupTags based on query
   *    parameters:
   *      - $ref: '#/components/parameters/groupId'
   *      - $ref: '#/components/parameters/tagId'
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

groupTagRouter
  .route("/groupTag/:id")
  /**
   * @swagger
   * /groupTag/{id}:
   *  get:
   *    tags:
   *      - Group Tags
   *    description: Find groupTag by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the groupTag to return
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
   * /groupTag/{id}:
   *  put:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Group Tags
   *    description: Update a groupTag item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the groupTag to update
   *        required: true
   *        schema:
   *          type: string
   *    requestBody:
   *      description: Group tag object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/groupTag'
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
   * /groupTag/{id}:
   *  delete:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Group Tags
   *    description: Update a groupTag item by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: id of the groupTag to delete
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

groupTagRouter
  .route("/groupTag")
  /**
   * @swagger
   * /groupTag:
   *  post:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Group Tags
   *    description: Create a new group tag.
   *    requestBody:
   *      description: Group tag object
   *      required: true
   *      content:
   *        'application/json':
   *          schema:
   *            $ref: '#/definitions/groupTag'
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

export default groupTagRouter;
