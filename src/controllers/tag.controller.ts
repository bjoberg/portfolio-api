import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status';

import SequelizeController from "./sequelize.controller";
import SequelizeService from '../services/sequelize.service';
import TagService from '../services/tag.service';

export default class TagController extends SequelizeController {
  private tagService: TagService;

  /**
   * Construct a new tag controller
   * 
   * @param sequelizeService service for interacting with generic sequelize functions
   * @param tagService service for interacting with the tag model
   */
  constructor(sequelizeService: SequelizeService, tagService: TagService) {
    super(sequelizeService);
    this.tagService = tagService;
  }

  /**
   * Get all tags associated with a specific group
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async listTagsForGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const page = this.getPage(req.query.page);
      const limit = this.getLimit(req.query.limit);
      const groupId = req.params.id;
      const response = await this.tagService.listTagsForGroup(groupId, limit, page, req.query);
      res.status(HttpStatus.OK);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all tags associated with a specific image
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async listTagsForImage(req: Request, res: Response, next: NextFunction) {
    try {
      const page = this.getPage(req.query.page);
      const limit = this.getLimit(req.query.limit);
      const imageId = req.params.id;
      const response = await this.tagService.listTagsForImage(imageId, limit, page, req.query);
      res.status(HttpStatus.OK);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Disassociate tags from the specified group
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async removeTagsFromGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const groupId = req.params.id;
      const tagIds = this.getRequestParamsArray(req.query.tagId);
      const response = await this.tagService.removeTagsFromGroup(groupId, tagIds);
      res.status(HttpStatus.OK);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Disassociate tags from the specified image
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async removeTagsFromImage(req: Request, res: Response, next: NextFunction) {
    try {
      const imageId = req.params.id;
      const tagIds = this.getRequestParamsArray(req.query.tagId);
      const response = await this.tagService.removeTagsFromImage(imageId, tagIds);
      res.status(HttpStatus.OK);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Associate tags to the specific group
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async addTagsToGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const groupId = req.params.id;
      const tagIds = this.getRequestParamsArray(req.query.tagId);
      const response = await this.tagService.addTagsToGroup(groupId, tagIds);
      res.status(HttpStatus.OK);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Associate tags to a specific image
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async addTagsToImage(req: Request, res: Response, next: NextFunction) {
    try {
      const imageId = req.params.id;
      const tagIds = this.getRequestParamsArray(req.query.tagId);
      const response = await this.tagService.addTagsToImage(imageId, tagIds);
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