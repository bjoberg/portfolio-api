import { Request, Response, NextFunction } from 'express';
import { Model } from 'sequelize';

import SequelizeController from "./sequelize.controller";
import ApiError from '../utils/models/api-error';
import EntityList from '../utils/models/enity-list';

export default class GroupController extends SequelizeController {
  private imageModel: Model;

  /**
   * Construct a new group controller
   * @param model sequelize model defenition
   */
  constructor(model: Model, imageModel: Model) {
    super(model);
    this.imageModel = imageModel;
  }

  /**
   * Get all of the groups images
   */
  public async listAllImages(req: Request, res: Response, next: NextFunction) {
    try {
      req = this.sequelizeHelpers.setPage(req);
      req = this.sequelizeHelpers.setLimit(req);

      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const groupId = req.params.id;
      // @ts-ignore
      const data = await this.model.listAllImages(req.query, groupId, this.imageModel);
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