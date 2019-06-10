import { Request, Response, NextFunction } from 'express';
import { Model } from 'sequelize';

/**
 * Controller for interacting with Sequelize
 */
export default class SequelizeController {
  private model: Model;
  
  /**
   * Construct a new sequelize controller
   * @param model sequelize model defenition
   */
  constructor(model: Model) {
    this.model = model;
  }

  /**
   * Get all of the models data
   */
  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      res.json(await this.model.getAll(req.query));
    } catch (error) {
      next(error);
    }
  }
}