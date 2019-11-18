import SequelizeService from "./sequelize.service";
import { Model } from "sequelize/types";
import HttpStatus from "http-status";

import PaginationResponse from "../utils/models/pagination-response.interface";
import BulkResponse from "../utils/models/bulk-response.model";

export default class TagService extends SequelizeService {
  private groupModel: Model;
  private groupTagModel: Model;

  /**
   * Construct a new tag service
   * 
   * @param tagModel tag model definition
   * @param groupModel group model definition
   * @param groupTagModel groupTag model definition 
   */
  constructor(tagModel: Model, groupModel: Model, groupTagModel: Model) {
    super(tagModel);
    this.groupModel = groupModel;
    this.groupTagModel = groupTagModel;
  }

  /**
   * Get tag in a specific group
   * 
   * @param groupId unique id of group to search for
   * @param tagId unique id of tag to search for
   */
  public async getTagInGroup(groupId: string, tagId: string): Promise<any> {
    try {
      // @ts-ignore-next-line
      const response = await this.model.getTagInGroup(groupId, tagId, this.groupModel);
      return response;
    } catch (error) {
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, `Error retrieving tags from group (${groupId})`, error);
    }
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

  /**
   * Remove tags from the specified group
   * 
   * @param groupId unique id of group to delete tags from
   * @param tagIds array of tag ids to remove from group
   */
  public async removeTagsFromGroup(groupId: string, tagIds: string[]): Promise<BulkResponse> {
    const bulkResponse = new BulkResponse();
    for (let i = 0; i < tagIds.length; i++) {
      const tagId = tagIds[i];
      try {
        // @ts-ignore-next-line
        const response = await this.model.removeTagFromGroup(groupId, tagId, this.groupTagModel);
        if (response > 0) bulkResponse.addSuccess(tagId);
        else bulkResponse.addError(tagId, 'Tag does not exist in group');
      } catch (error) {
        bulkResponse.addError(tagId, error.message);
      }
    }
    return bulkResponse;
  }

  /**
   * Add tags to the specified group
   * 
   * @param groupId unique id of group to delete tags from
   * @param tagIds array of tag ids to remove from group
   */
  public async addTagsToGroup(groupId: string, tagIds: string[]): Promise<BulkResponse> {
    const bulkResponse = new BulkResponse();
    for (let i = 0; i < tagIds.length; i++) {
      const tagId = tagIds[i];
      try {
        const tag = await this.getTagInGroup(groupId, tagId);
        if (!tag) {
          // @ts-ignore-next-line
          await this.model.addTagToGroup(groupId, tagId, this.groupTagModel);
          bulkResponse.addSuccess(tagId);
        } else {
          bulkResponse.addError(tagId, 'Tag already exists in group');
        }
      } catch (error) { bulkResponse.addError(tagId, error.message); }
    }
    return bulkResponse;
  }
}