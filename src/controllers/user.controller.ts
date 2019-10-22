import { Request, Response } from 'express';
import HttpStatus from 'http-status';

import Role from '../utils/models/roles';

export default class UserController {
  /**
   * Construct a new user controller
   * @param user sequelize user model
   */
  constructor(private user: any) { }

  /**
   * Get the role for the provided user
   * @param req Express Request object
   * @param res Express Response object
   */
  public getRole = async (req: Request, res: Response) => {
    let response = {
      status: HttpStatus.OK,
      role: Role.READONLY
    };
    try {
      const googleId = req.params.googleId;
      const user = await this.user.getByGoogleId(googleId);
      if (user) {
        response.role = Role.ADMIN;
        res.status(response.status).json(response);
      };
    } catch (error) {
      res.status(response.status).json(response);
    }
  }
}