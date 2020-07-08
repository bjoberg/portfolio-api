import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status';

import SequelizeController from "./sequelize.controller";
import SequelizeService from '../services/sequelize.service';
import ImageService from '../services/image.service';

export default class ImageController extends SequelizeController {
  private imageService: ImageService;

  /**
   * Construct a new image controller
   * 
   * @param sequelizeService service for interacting with generic sequelize functions
   * @param imageService service for interacting with the image model
   */
  constructor(sequelizeService: SequelizeService, imageService: ImageService) {
    super(sequelizeService);
    this.imageService = imageService;
  }

  /**
   * Get all images associated with a specific group
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async listImagesForGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const page = this.getPage(req.query.page as string);
      const limit = this.getLimit(req.query.limit as string);
      const sort = this.getSort(req.query.sort);
      const groupId = req.params.id;
      const response = await this.imageService.listImagesForGroup(groupId, limit, page, req.query, sort);
      res.status(HttpStatus.OK);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all images not associated with a specific group
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async listImagesNotForGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const page = this.getPage(req.query.page as string);
      const limit = this.getLimit(req.query.limit as string);
      const groupId = req.params.id;
      const response = await this.imageService.listImagesNotForGroup(groupId, limit, page, req.query);
      res.status(HttpStatus.OK);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Disassociate images from the specified group
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async removeImagesFromGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const groupId = req.params.id;
      const imageIds = this.getRequestParamsArray(req.query.imageId as string);
      const response = await this.imageService.removeImagesFromGroup(groupId, imageIds);
      res.status(HttpStatus.OK);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Associate images to the specified group
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async addImagesToGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const groupId = req.params.id;
      let imageIds = this.getRequestParamsArray(req.query.imageId as string);
      const response = await this.imageService.addImagesToGroup(groupId, imageIds);
      res.status(HttpStatus.OK);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Convert parameter values to array
   * 
   * @param params string or list of parameter values
   */
  private getRequestParamsArray(params: string | string[]): string[] {
    let values: string[] = [];
    if (params) {
      if (!Array.isArray(params)) values = [params];
      else values = params;
    }
    return values;
  }
}