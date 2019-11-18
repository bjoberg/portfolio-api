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
   * @param model tag model definition
   * @param groupModel group model definition
   */
  constructor(sequelizeService: SequelizeService, tagService: TagService) {
    super(sequelizeService);
    this.tagService = tagService;
  }

  /**
   * Get all tags for a specific group
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
   * Remove tags from the specified group
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async removeTagsFromGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const groupId = req.params.id;
      let tagIds = req.query.tagId ? req.query.tagId : [];
      if (!Array.isArray(tagIds)) tagIds = [tagIds];
      const response = await this.tagService.removeTagsFromGroup(groupId, tagIds);
      res.status(HttpStatus.OK);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}