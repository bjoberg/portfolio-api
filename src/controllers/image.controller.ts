import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status';

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
  public async listImagesForGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const page = this.getPage(req.query.page);
      const limit = this.getLimit(req.query.limit);
      const groupId = req.params.id;
      const entityList = await this.imageService.listImagesForGroup(groupId, limit, page, req.query);
      res.status(HttpStatus.OK);
      res.json(entityList);
    } catch (error) {
      next(error as ApiError);
    }
  }

  /**
   * Remove images from the specified group
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async removeImagesFromGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const groupId = req.params.id;
      let imageIds = req.query.imageId ? req.query.imageId : [];
      if (!Array.isArray(imageIds)) imageIds = [imageIds];
      const response = await this.imageService.removeImagesFromGroup(groupId, imageIds);
      res.status(HttpStatus.OK);
      res.json(response);
    } catch (error) {
      next(error as ApiError);
    }
  }

  /**
   * Add images from the specified group
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async addImagesToGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const groupId = req.params.id;
      let imageIds = req.query.imageId ? req.query.imageId : [];
      if (!Array.isArray(imageIds)) imageIds = [imageIds];
      const response = await this.imageService.addImagesToGroup(groupId, imageIds);
      res.status(HttpStatus.OK);
      res.json(response);
    } catch (error) {
      next(error as ApiError);
    }
  }
}