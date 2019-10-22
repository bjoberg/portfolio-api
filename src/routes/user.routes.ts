import { Router } from "express";

import UserController from "../controllers/user.controller";

const user = require("../database/models").user;
const userRouter = Router();
const controller = new UserController(user);

userRouter
  .route("/user/:googleId/role")
  /**
   * @swagger
   * /user/{googleId}/role:
   *  get:
   *    tags:
   *      - User
   *    description: Get the role for the provided user id
   *    parameters:
   *      - in: path
   *        name: googleId
   *        description: google id of the user to get role details
   *        required: true
   *        schema:
   *          type: string
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   */
  .get(controller.getRole)

export default userRouter;
