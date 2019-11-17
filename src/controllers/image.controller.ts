import { Request, Response, NextFunction } from 'express';

import SequelizeController from "./sequelize.controller";
import ApiError from '../utils/models/api-error';
import SequelizeService from '../services/sequelize.service';
import ImageService from '../services/image.service';

export default class ImageController extends SequelizeController {
  private imageService: ImageService;

  /**
   * Construct a new image controller
   * 
   * @param model image model definition
   * @param groupModel group model definition
   */
  constructor(sequelizeService: SequelizeService, imageService: ImageService) {
    super(sequelizeService);
    this.imageService = imageService;
  }

  /**
   * Get all images in a specific group
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async listAllForGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const page = this.getPage(req.query.page);
      const limit = this.getLimit(req.query.limit);
      const groupId = req.params.id;
      const entityList = await this.imageService.listAllForGroup(groupId, limit, page, req.query);
      res.json(entityList);
    } catch (error) {
      next(error as ApiError);
    }
  }

}