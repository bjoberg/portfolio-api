import { Request, Response } from 'express';
import HttpStatus from 'http-status';

import { ROLES } from '../utils/models/defaults';

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
      role: ROLES.READONLY
    };
    try {
      const googleId = req.params.googleId;
      const user = await this.user.getByGoogleId(googleId);
      if (user) {
        response.role = ROLES.ADMIN;
        res.status(response.status).json(response);
      };
    } catch (error) {
      res.status(response.status).json(response);
    }
  }
}