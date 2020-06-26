import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status';

import { LIMIT_DEFAULT, PAGE_DEFAULT } from '../utils/models/defaults';
import SequelizeService from '../services/sequelize.service';
import ApiError from '../utils/models/api-error.interface';
import { SORT } from '../utils/models/defaults';

export default class SequelizeController {
  protected limitDefault: number = LIMIT_DEFAULT;
  protected pageDefault: number = PAGE_DEFAULT;
  protected sequelizeService: SequelizeService;

  /**
   * Construct a new sequelize controller
   * 
   * @param model sequelize model definition
   */
  constructor(sequelizeService: SequelizeService) { this.sequelizeService = sequelizeService; }

  /**
   * List all of the models data
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express Next function
   */
  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const page = this.getPage(req.query.page as string);
      const limit = this.getLimit(req.query.limit as string);
      const sort = this.getSort(req.query.sort);
      const response = await this.sequelizeService.list(limit, page, req.query, sort);
      res.status(HttpStatus.OK);
      res.json(response);
    } catch (error) {
      next(error);
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
      const response = await this.sequelizeService.get(id);
      if (!response) {
        throw this.getApiError(HttpStatus.NOT_FOUND, `${id} deleted or does not exist.`);
      }
      res.status(HttpStatus.OK);
      res.json(response);
    } catch (error) {
      next(error);
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
      const response = await this.sequelizeService.create(body);
      res.status(HttpStatus.CREATED);
      res.json(response);
    } catch (error) {
      next(error);
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
      const response = await this.sequelizeService.update(id, body);
      res.status(HttpStatus.OK);
      res.json(response);
    } catch (error) {
      next(error);
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
      const response = await this.sequelizeService.delete(id);
      res.status(HttpStatus.NO_CONTENT);
      res.json(response);
    } catch (error) {
      next(error);
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

  /**
   * Get the sort order array [sortField, sortDirection] for the provided request.
   *
   * @param sort sort string (EX: 'sortField:sortDirect')
   */
  protected getSort(sort: string): string[] | undefined {
    if (!sort || !sort.includes(SORT.SPLITTER)) return undefined;
    const sortArr = sort.split(SORT.SPLITTER);
    if (sortArr.length !== 2) return undefined;
    const sortDirection = sortArr[1].toUpperCase();
    if (sortDirection !== SORT.ASCENDING && sortDirection !== SORT.DESCENDING) return undefined;
    return sortArr;
  }

  /**
   * Get new ApiError based on input
   * 
   * @param status http status of the error
   * @param defaultMessage default message if error object does not contain message
   * @param error error object
   * @returns ApiError
   */
  protected getApiError(status: number, defaultMessage: string, error?: Error): ApiError {
    let message = defaultMessage;
    if (error && error.message) message = error.message;
    return { status, message } as ApiError;
  }
}