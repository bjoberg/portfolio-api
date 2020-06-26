import { Model } from 'sequelize';
import HttpStatus from 'http-status';

import ApiError from '../utils/models/api-error.interface';
import PaginationResponse from '../utils/models/pagination-response.interface';

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
   * @param sort sort order of request
   * @returns list of all the model's data
   * @throws ApiError if query fails
   */
  public async list(limit: number, page: number, query: any, sort: string[] | undefined): Promise<PaginationResponse> {
    try {
      const offset = this.getOffset(limit, page);
      // @ts-ignore-next-line
      const result = await this.model.list(limit, offset, query, sort);
      const response: PaginationResponse = {
        limit,
        page,
        sort: result.sort,
        totalItems: result.data.count,
        pageCount: result.data.rows.length,
        rows: result.data.rows
      };
      return response;
    } catch (error) {
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, 'Error retrieving items', error);
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
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, `Error retrieving ${id}`, error);
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
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, 'Error creating item', error);
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
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, 'Error updating item', error);
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
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, 'Error deleting item', error);
    }
  }

  /**
   * Get the offset query value 
   * 
   * @param limit number of items to return
   * @param page range of items to return
   */
  protected getOffset(limit: number, page: number) {
    return limit * page;
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