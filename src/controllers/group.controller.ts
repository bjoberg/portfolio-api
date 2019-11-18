import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status';

import SequelizeController from "./sequelize.controller";
import SequelizeService from '../services/sequelize.service';
import GroupService from '../services/group.service';

export default class GroupController extends SequelizeController {
  private groupService: GroupService;

  /**
   * Construct a new image controller
   * 
   * @param model image model definition
   * @param groupModel group model definition
   */
  constructor(sequelizeService: SequelizeService, groupService: GroupService) {
    super(sequelizeService);
    this.groupService = groupService;
  }

  /**
   * Get all images in a specific group
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async listGroupsForImage(req: Request, res: Response, next: NextFunction) {
    try {
      const page = this.getPage(req.query.page);
      const limit = this.getLimit(req.query.limit);
      const groupId = req.params.id;
      const response = await this.groupService.listGroupsForImage(groupId, limit, page, req.query);
      res.status(HttpStatus.OK);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Remove groups from the specified image
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async removeGroupsFromImage(req: Request, res: Response, next: NextFunction) {
    try {
      const imageId = req.params.id;
      let groupIds = req.query.groupId ? req.query.groupId : [];
      if (!Array.isArray(groupIds)) groupIds = [groupIds];
      const response = await this.groupService.removeGroupsFromImage(imageId, groupIds);
      res.status(HttpStatus.OK);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Associate groups to the specified image
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async addGroupsToImage(req: Request, res: Response, next: NextFunction) {
    try {
      const imageId = req.params.id;
      let groupIds = req.query.groupId ? req.query.groupId : [];
      if (!Array.isArray(groupIds)) groupIds = [groupIds];
      const response = await this.groupService.addGroupsToImage(imageId, groupIds);
      res.status(HttpStatus.OK);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}