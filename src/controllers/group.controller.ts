import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status';

import SequelizeController from "./sequelize.controller";
import SequelizeService from '../services/sequelize.service';
import GroupService from '../services/group.service';

export default class GroupController extends SequelizeController {
  private groupService: GroupService;

  /**
   * Construct a new group controller
   * 
   * @param sequelizeService service for interacting with generic sequelize functions
   * @param groupService service for interacting with the group model
   */
  constructor(sequelizeService: SequelizeService, groupService: GroupService) {
    super(sequelizeService);
    this.groupService = groupService;
  }

  /**
   * Get all groups associated with a specific image
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async listGroupsForImage(req: Request, res: Response, next: NextFunction) {
    try {
      const page = this.getPage(req.query.page);
      const limit = this.getLimit(req.query.limit);
      const imageId = req.params.id;
      const response = await this.groupService.listGroupsForImage(imageId, limit, page, req.query);
      res.status(HttpStatus.OK);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Disassociate groups from the specified image
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async removeGroupsFromImage(req: Request, res: Response, next: NextFunction) {
    try {
      const imageId = req.params.id;
      const groupIds = this.getRequestParamsArray(req.query.groupId);
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
      const groupIds = this.getRequestParamsArray(req.query.groupId);
      const response = await this.groupService.addGroupsToImage(imageId, groupIds);
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