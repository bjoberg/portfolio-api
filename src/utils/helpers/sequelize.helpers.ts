import { Request } from 'express';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '../models/defaults';

export default class SequelizeHelpers {
  private limitDefault: number;
  private pageDefault: number;

  constructor() {
    this.limitDefault = LIMIT_DEFAULT;
    this.pageDefault = PAGE_DEFAULT;
  }

  /**
   * Set the limit for a particular request based on its query params
   * @param req Express request object containing page query
   */
  setPage(req: Request): Request {
    if (req.query !== undefined && req.query.page === undefined) {
      req.query.page = this.pageDefault;
    }
    return req;
  }

  /**
   * Set the page for a particular request based on its query params
   * @param req Express request object containing limit query
   */
  setLimit(req: Request): Request {
    if (req.query !== undefined && req.query.limit === undefined) {
      req.query.limit = this.limitDefault;
    }
    return req;
  }
}