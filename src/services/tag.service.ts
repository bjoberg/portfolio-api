import SequelizeService from "./sequelize.service";
import { Model } from "sequelize/types";
import HttpStatus from "http-status";

import BulkResponse from "../utils/models/bulk-response.model";
import PaginationResponse from "../utils/models/pagination-response.interface";

export default class TagService extends SequelizeService {
  private groupModel: Model;
  private imageModel: Model;
  private groupTagModel: Model;
  private imageTagModel: Model;

  /**
   * Construct a new tag service
   * 
   * @param tagModel tag model definition
   * @param groupModel group model definition
   * @param imageModel image model definition
   * @param groupTagModel groupTag model definition
   * @param imageTagModel imageTag model definition
   */
  constructor(
    tagModel: Model,
    groupModel: Model,
    imageModel: Model,
    groupTagModel: Model,
    imageTagModel: Model) {
    super(tagModel);
    this.groupModel = groupModel;
    this.imageModel = imageModel;
    this.groupTagModel = groupTagModel;
    this.imageTagModel = imageTagModel;
  }

  /**
   * Get tag associated with group
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
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, `Error retrieving tag from group (${groupId})`, error);
    }
  }

  /**
   * Get tag associated with image
   * 
   * @param imageId unique id of image to search for
   * @param tagId unique id of tag to search for
   */
  public async getTagInImage(imageId: string, tagId: string): Promise<any> {
    try {
      // @ts-ignore-next-line
      const response = await this.model.getTagInImage(imageId, tagId, this.imageModel);
      return response;
    } catch (error) {
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, `Error retrieving tag associated with image (${imageId})`, error);
    }
  }

  /**
   * Get all tags associated with a specific group
   * 
   * @param groupId unique id of group to search for
   * @param limit number of items to return
   * @param page range of items to return
   * @param filter object with properties to query with
   * @param sort sort order of request
   */
  public async listTagsForGroup(groupId: string, limit: number, page: number, filter: any, sort: string[] | undefined): Promise<PaginationResponse> {
    try {
      const offset = this.getOffset(limit, page);
      // @ts-ignore-next-line
      const result = await this.model.listTagsForGroup(groupId, this.groupModel, limit, offset, filter, sort);
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
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, `Error retrieving tags for group (${groupId})`, error);
    }
  }

  /**
   * Get all tags associated with a specific image
   * 
   * @param imageId unique id of image to search for
   * @param limit number of items to return
   * @param page range of items to return
   * @param filter object with properties to query with
   */
  public async listTagsForImage(imageId: string, limit: number, page: number, filter: any): Promise<PaginationResponse> {
    try {
      const offset = this.getOffset(limit, page);
      // @ts-ignore-next-line
      const result = await this.model.listTagsForImage(imageId, this.imageModel, limit, offset, filter);
      const response: PaginationResponse = {
        limit,
        page,
        totalItems: result.count,
        pageCount: result.rows.length,
        rows: result.rows
      };
      return response;
    } catch (error) {
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, `Error retrieving tags for image (${imageId})`, error);
    }
  }

  /**
   * Disassociate a list of tags from the specified group
   * 
   * @param groupId unique id of group to delete tags from
   * @param tagIds array of tag ids to remove from group
   */
  public async removeTagsFromGroup(groupId: string, tagIds: string[]): Promise<BulkResponse> {
    const bulkResponse = new BulkResponse();
    for (let i = 0; i < tagIds.length; i++) {
      const tagId = tagIds[i];
      try {
        await this.removeTagFromGroup(groupId, tagId);
        bulkResponse.addSuccess(tagId);
      } catch (error) {
        bulkResponse.addError(tagId, error.message);
      }
    }
    return bulkResponse;
  }

  /**
   * Disassociate a tag from the specified group
   * 
   * @param groupId unique id of group to disassociate from tag
   * @param tagId unique id of tag to disassociate from group
   */
  public async removeTagFromGroup(groupId: string, tagId: string): Promise<any> {
    try {
      // When the sequelize models are in Typescript, this could be a SequelizeService<GroupTag>
      // @ts-ignore
      const response = await this.groupTagModel.destroy({ where: { groupId, tagId } }) as number;
      if (response > 0) return response;
      else throw this.getApiError(HttpStatus.CONFLICT, 'Tag is not associated with group');
    } catch (error) {
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, 'Unable to disassociate tag from group', error);
    }
  }

  /**
   * Disassociate a list of tags from the specified image
   * 
   * @param imageId unique id of image to disassociate from tag
   * @param tagIds array of tag ids to disassociate from image
   */
  public async removeTagsFromImage(imageId: string, tagIds: string[]): Promise<BulkResponse> {
    const bulkResponse = new BulkResponse();
    for (let i = 0; i < tagIds.length; i++) {
      const tagId = tagIds[i];
      try {
        await this.removeTagFromImage(imageId, tagId);
        bulkResponse.addSuccess(tagId);
      } catch (error) {
        bulkResponse.addError(tagId, error.message);
      }
    }
    return bulkResponse;
  }

  /**
   * Disassociate a tag from the specified image
   * 
   * @param imageId unique id of image to disassociate from tag
   * @param tagId unique id of tag to disassociate from image
   */
  public async removeTagFromImage(imageId: string, tagId: string): Promise<any> {
    try {
      // When the sequelize models are in Typescript, this could be a SequelizeService<ImageTag>
      // @ts-ignore
      const response = await this.imageTagModel.destroy({ where: { imageId, tagId } }) as number;
      if (response > 0) return response;
      else throw this.getApiError(HttpStatus.CONFLICT, 'Image is not associated with tag');
    } catch (error) {
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, 'Unable to disassociate image from tag', error);
    }
  }

  /**
   * Associate a list of tags to the specified group
   * 
   * @param groupId unique id of group to associate to tags
   * @param tagIds array of tag ids to associate to group
   */
  public async addTagsToGroup(groupId: string, tagIds: string[]): Promise<BulkResponse> {
    const bulkResponse = new BulkResponse();
    for (let i = 0; i < tagIds.length; i++) {
      const tagId = tagIds[i];
      try {
        await this.addTagToGroup(groupId, tagId);
        bulkResponse.addSuccess(tagId);
      } catch (error) {
        bulkResponse.addError(tagId, error.message);
      }
    }
    return bulkResponse;
  }

  /**
   * Associate a tag to a group
   * 
   * @param groupId unique id of group to associate to tag
   * @param tagId unique id of tag to associate to group
   */
  public async addTagToGroup(groupId: string, tagId: string): Promise<any> {
    try {
      const group = await this.getTagInGroup(groupId, tagId);
      if (!group) {
        const model = { groupId, tagId };
        // When the sequelize models are in Typescript, this could be a SequelizeService<GroupTag>
        // @ts-ignore-next-line
        const result = await this.groupTagModel.create(model);
        return result;
      } else {
        throw this.getApiError(HttpStatus.CONFLICT, 'Tag is already associated with group');
      }
    } catch (error) {
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, 'Unable to associate tag to group', error);
    }
  }

  /**
   * Associate a list of tags to the specific image
   * 
   * @param imageId unique id of image to associate to tags
   * @param tagIds array of tag ids to associate to image
   */
  public async addTagsToImage(imageId: string, tagIds: string[]): Promise<BulkResponse> {
    const bulkResponse = new BulkResponse();
    for (let i = 0; i < tagIds.length; i++) {
      const tagId = tagIds[i];
      try {
        await this.addTagToImage(imageId, tagId);
        bulkResponse.addSuccess(tagId);
      } catch (error) { bulkResponse.addError(tagId, error.message); }
    }
    return bulkResponse;
  }

  /**
   * Associate a tag to an image
   * 
   * @param imageId unique id of image to associate to tag
   * @param tagId unique id of tag to associate to image
   */
  public async addTagToImage(imageId: string, tagId: string): Promise<any> {
    try {
      const image = await this.getTagInImage(imageId, tagId);
      if (!image) {
        const model = { imageId, tagId };
        // When the sequelize models are in Typescript, this could be a SequelizeService<ImageTag>
        // @ts-ignore-next-line
        const result = await this.imageTagModel.create(model);
        return result;
      } else {
        throw this.getApiError(HttpStatus.CONFLICT, 'Tag is already associated with image');
      }
    } catch (error) {
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, 'Unable to associate tag to image', error);
    }
  }
}