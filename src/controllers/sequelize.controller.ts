import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status';

import ApiError from '../utils/models/api-error';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '../utils/models/defaults';
import SequelizeService from '../services/sequelize.service';

export default class SequelizeController {
  protected limitDefault: number;
  protected pageDefault: number;
  protected service: SequelizeService;

  /**
   * Construct a new sequelize controller
   * 
   * @param model sequelize model definition
   */
  constructor(service: SequelizeService) {
    this.limitDefault = LIMIT_DEFAULT;
    this.pageDefault = PAGE_DEFAULT;
    this.service = service;
  }

  /**
   * List all of the models data
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const page = this.getPage(req.query.page);
      const limit = this.getLimit(req.query.limit);
      const entityList = await this.service.list(limit, page, req.query);
      res.status(HttpStatus.OK);
      res.json(entityList);
    } catch (error) {
      next(error as ApiError);
    }
  }

  /**
   * Get a single instance of the model
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const response = await this.service.get(id);
      res.status(HttpStatus.OK);
      res.json(response);
    } catch (error) {
      next(error as ApiError);
    }
  }

  /**
   * Create a single instance of the model
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const response = await this.service.create(body);
      res.status(HttpStatus.CREATED);
      res.json(response);
    } catch (error) {
      next(error as ApiError);
    }
  }

  /**
   * Update a single instance of the model
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const body = req.body;
      const response = await this.service.update(id, body);
      res.status(HttpStatus.OK);
      res.json(response);
    } catch (error) {
      next(error as ApiError);
    }
  }

  /**
   * Delete a single instance of the model
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const response = await this.service.delete(id);
      res.status(HttpStatus.NO_CONTENT);
      res.json(response);
    } catch (error) {
      next(error as ApiError);
    }
  }

  /**
   * Get the range of items to return for a single query
   * 
   * @param page range of items to return
   */
  protected getPage(page: string): number {
    const pageAsInt = parseInt(page);
    if (!page || Number.isNaN(pageAsInt)) return this.pageDefault;
    return pageAsInt;
  }

  /**
   * Get the number of items to return for a single query
   * 
   * @param limit number of items to return
   */
  protected getLimit(limit: string): number {
    const limitAsInt = parseInt(limit);
    if (!limit || Number.isNaN(limitAsInt)) return this.limitDefault;
    return limitAsInt;
  }
}