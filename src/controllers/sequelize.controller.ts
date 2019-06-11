import { Request, Response, NextFunction } from 'express';
import { Model } from 'sequelize';
import HttpStatus from 'http-status';
import ApiError from '../config/ApiError';

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
  public list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      res.json(await this.model.list(req.query));
    } catch (error) {
      next(error as ApiError);
    }
  }

  /**
   * Get a single instance of a specific model
   */
  public get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      res.json(await this.model.get(req.params.id));
    } catch (error) {
      next(error as ApiError);
    }
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      let item = await this.model.create(req.body);
      res.status(HttpStatus.CREATED);
      res.json(item);
    } catch (error) {
      next(error as ApiError);
    }
  }
}