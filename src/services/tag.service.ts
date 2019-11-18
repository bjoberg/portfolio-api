import SequelizeService from "./sequelize.service";
import { Model } from "sequelize/types";
import HttpStatus from "http-status";

import PaginationResponse from "../utils/models/pagination-response.interface";

export default class TagService extends SequelizeService {
  private groupModel: Model;

  /**
   * Construct a new tag service
   * 
   * @param tagModel tag model definition
   * @param groupModel group model definition
   */
  constructor(tagModel: Model, groupModel: Model) {
    super(tagModel);
    this.groupModel = groupModel;
  }

  /**
   * Get all tags in a specific group
   * 
   * @param groupId unique id of group to search for
   * @param limit number of items to return
   * @param page range of items to return
   * @param filter object with properties to query with
   */
  public async listTagsForGroup(groupId: string, limit: number, page: number, filter: any): Promise<PaginationResponse> {
    try {
      // @ts-ignore-next-line
      const result = await this.model.listTagsForGroup(groupId, this.groupModel, limit, page, filter);
      const response: PaginationResponse = {
        limit,
        page,
        totalItems: result.count,
        pageCount: result.rows.length,
        rows: result.rows
      };
      return response;
    } catch (error) {
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, `Error retrieving tags for group (${groupId})`, error);
    }
  }
}