import { Model } from 'sequelize';
import HttpStatus from 'http-status';

import EntityList from '../utils/models/enity-list';
import ApiError from '../utils/models/api-error';

export default class SequelizeService {
  protected model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  /**
   * Get a list of all the model's data
   * 
   * @param limit number of items to return
   * @param page range of items to return
   * @param query object with properties to query with
   * @returns list of all the model's data
   * @throws ApiError if query fails
   */
  public async list(limit: number, page: number, query: any): Promise<EntityList> {
    try {
      // @ts-ignore-next-line
      const response = await this.model.list(limit, page, query);
      const entityList: EntityList = {
        limit,
        page,
        totalItems: response.count,
        pageCount: response.rows.length,
        rows: response.rows
      };
      return entityList;
    } catch (error) {
      const apiError: ApiError = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
      throw apiError;
    }
  }

  /**
   * Get a single instance of the model
   * 
   * @param id unique id of the model to return
   * @returns single instance of the model
   * @throws ApiError if query fails
   */
  public async get(id: string): Promise<any> {
    try {
      // @ts-ignore-next-line
      const response = await this.model.get(id);
      return response;
    } catch (error) {
      const apiError: ApiError = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
      throw apiError;
    }
  }

  /**
   * Create a single instance of the model
   * 
   * @param model object defining new model
   * @returns newly created instance of the model
   * @throws ApiError if query fails
   */
  public async create(model: any): Promise<any> {
    try {
      // @ts-ignore-next-line
      const response = await this.model.create(model);
      return response;
    } catch (error) {
      const apiError: ApiError = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
      throw apiError;
    }
  }

  /**
   * Update a single instance of the model
   * 
   * @param id unique id of the model to update
   * @param model object defining updated model
   * @returns updated instance of the model
   * @throws ApiError if query fails
   */
  public async update(id: string, model: any): Promise<any> {
    try {
      // @ts-ignore-next-line
      const response = await this.model.update(model, {
        where: { id },
        limit: 1,
        returning: true
      });
      return response;
    } catch (error) {
      const apiError: ApiError = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
      throw apiError;
    }
  }

  /**
   * Delete a single instance of the model
   * 
   * @param id unique id of the model to delete
   * @returns number of items deleted
   * @throws ApiError if query fails
   */
  public async delete(id: string): Promise<any> {
    try {
      const response = await this.model.destroy({
        // @ts-ignore-next-line
        where: { id }
      });
      return response;
    } catch (error) {
      const apiError: ApiError = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
      throw apiError;
    }
  }
}