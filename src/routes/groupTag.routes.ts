import { Router } from "express";
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
  .get(controller.list)
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
  .delete(authController.validateRequest, controller.deleteAll);

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
  .get(controller.get)
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
  .put(authController.validateRequest, controller.update)
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
  .delete(authController.validateRequest, controller.delete);

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
  .post(authController.validateRequest, controller.create);

export default groupTagRouter;
