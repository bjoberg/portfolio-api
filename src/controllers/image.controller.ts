import { Request, Response, NextFunction} from 'express';

export default class ImageController {
  private readonly imageModel = require('../database/models').image;

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await this.imageModel.getAll(req.query));
    } catch (error) {
      next(error);
    }
  }
}