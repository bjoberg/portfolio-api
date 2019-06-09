import { Request, Response, NextFunction} from 'express';

export default class GroupController {
  private readonly model = require('../database/models').group;

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await this.model.getAll(req.query));
    } catch (error) {
      next(error);
    }
  }
}