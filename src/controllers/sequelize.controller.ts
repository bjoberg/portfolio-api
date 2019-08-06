import { Request, Response, NextFunction } from 'express';
import { Model } from 'sequelize';
import HttpStatus from 'http-status';

import SequelizeHelpers from '../utils/helpers/sequelize.helpers';
import ApiError from '../utils/models/api-error';
import EntityList from '../utils/models/enity-list';

/**
 * Controller for interacting with Sequelize
 */
export default class SequelizeController {
  private model: Model;
  private sequelizeHelpers: SequelizeHelpers;
  
  /**
   * Construct a new sequelize controller
   * @param model sequelize model defenition
   */
  constructor(model: Model) {
    this.model = model;
    this.sequelizeHelpers = new SequelizeHelpers();
  }

  /**
   * Get all of the models data
   */
  public list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      req = this.sequelizeHelpers.setPage(req);
      req = this.sequelizeHelpers.setLimit(req);

      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      // @ts-ignore
      const data = await this.model.list(req.query);
      const entityList: EntityList = {
        count: data.count,
        limit,
        page,
        rows: data.rows
      };

      res.json(entityList);
    } catch (error) {
      next(error as ApiError);
    }
  }

  /**
   * Get a single instance of the model
   */
  public get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      res.json(await this.model.get(req.params.id));
    } catch (error) {
      next(error as ApiError);
    }
  }

  /**
   * Create a single instance of the model
   */
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

  /**
   * Update a single instance of the model
   */
  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let result = await this.model.update(req.body, {
        where: {id: req.params.id},
        limit: 1,
        returning: true
      });
      res.status(HttpStatus.OK);
      res.json(result);
    } catch (error) {
      next(error as ApiError);
    }
  }

  /**
   * Delete a single instance of the model
   */
  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let result = await this.model.destroy({
         // @ts-ignore
        where: {
          id: req.params.id
        }
      });
      res.status(HttpStatus.OK);
      res.json(result);
    } catch (error) {
      next(error as ApiError);
    }
  }

  /**
   * Delete all instances of the model based on query params
   */
  public deleteAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
       // @ts-ignore
      let result = await this.model.deleteAll(req.query);
      res.status(HttpStatus.OK);
      res.json(result);
    } catch (error) {
      next(error as ApiError);
    }
  }
}