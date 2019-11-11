import { Request, Response, NextFunction } from 'express';
import { Model } from 'sequelize';

import SequelizeController from "./sequelize.controller";
import ApiError from '../utils/models/api-error';
import EntityList from '../utils/models/enity-list';

export default class ImageController extends SequelizeController {
  private group: Model;

  /**
   * Construct a new image controller
   * @param model sequelize model defenition
   */
  constructor(model: Model, group: Model) {
    super(model);
    this.group = group;
  }

  /**
   * Get all of the images data
   */
  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      req = this.sequelizeHelpers.setPage(req);
      req = this.sequelizeHelpers.setLimit(req);

      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      // @ts-ignore
      const data = await this.model.list(req.query, this.group);
      const entityList: EntityList = {
        limit,
        page,
        totalItems: data.count,
        pageCount: data.rows.length,
        rows: data.rows
      };

      res.json(entityList);
    } catch (error) {
      next(error as ApiError);
    }
  }
}