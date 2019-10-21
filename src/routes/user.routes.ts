import { Router } from "express";

import UserController from "../controllers/user.controller";

const user = require("../database/models").user;
const userRouter = Router();
const controller = new UserController(user);

userRouter
  .route("/role")
  /**
   * @swagger
   * /role:
   *  get:
   *    tags:
   *      - User
   *    description: Get the role for the provided user id
   *    parameters:
   *      - $ref: '#/components/parameters/googleId'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ok'
   */
  .get(controller.getRole)

export default userRouter;
