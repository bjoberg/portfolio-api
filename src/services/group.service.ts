import SequelizeService from "./sequelize.service";
import { Model } from "sequelize/types";
import HttpStatus from "http-status";

import PaginationResponse from "../utils/models/pagination-response.interface";
import BulkResponse from "../utils/models/bulk-response.model";

export default class GroupService extends SequelizeService {
  private imageModel: Model;
  private imageGroupModel: Model;

  /**
   * Construct a new group service
   * 
   * @param groupModel group model definition
   * @param imageModel image model definition
   * @param imageGroupModel imageGroup model definition 
   */
  constructor(groupModel: Model, imageModel: Model, imageGroupModel: Model) {
    super(groupModel);
    this.imageModel = imageModel;
    this.imageGroupModel = imageGroupModel;
  }

  /**
   * Get group associated with image
   * 
   * @param imageId unique id of image to search for
   * @param groupId unique id of group to search for
   */
  public async getGroupImage(imageId: string, groupId: string): Promise<any> {
    try {
      // @ts-ignore
      return await this.model.getGroupImage(imageId, groupId, this.imageModel);
    } catch (error) {
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, `Image group association does not exist`, error);
    }
  }

  /**
   * Get all groups associated with a specific image
   * 
   * @param imageId unique id of image to search for
   * @param limit number of items to return
   * @param page range of items to return
   * @param filter object with properties to query with
   */
  public async listGroupsForImage(imageId: string, limit: number, page: number, filter: any): Promise<PaginationResponse> {
    try {
      // @ts-ignore
      const result = await this.model.listGroupsForImage(imageId, this.imageModel, limit, page, filter);
      const response: PaginationResponse = {
        limit,
        page,
        totalItems: result.count,
        pageCount: result.rows.length,
        rows: result.rows
      };
      return response;
    } catch (error) {
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, `Error retrieving groups associated with image`, error);
    }
  }

  /**
   * Disassociate a list of groups from the specified image
   * 
   * @param imageId unique id of image to disassociate from groups
   * @param groupIds array of group ids to disassociate from image
   */
  public async removeGroupsFromImage(imageId: string, groupIds: string[]): Promise<BulkResponse> {
    const bulkResponse = new BulkResponse();
    for (let i = 0; i < groupIds.length; i++) {
      const groupId = groupIds[i];
      try {
        await this.removeGroupFromImage(imageId, groupId);
        bulkResponse.addSuccess(groupId);
      } catch (error) {
        bulkResponse.addError(groupId, error.message);
      }
    }
    return bulkResponse;
  }

  /**
   * Disassociate a group from the specified image
   * 
   * @param imageId unique id of image to disassociate from groups
   * @param groupId unique id of group to disassociate from image
   */
  public async removeGroupFromImage(imageId: string, groupId: string) {
    try {
      // When the sequelize models are in Typescript, this could be a SequelizeService<ImageGroup>
      // @ts-ignore
      const response = await this.imageGroupModel.destroy({ where: { imageId, groupId } });
      if (response > 0) return response;
      else throw this.getApiError(HttpStatus.CONFLICT, 'Group is not associated with image');
    } catch (error) {
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, 'Unable to disassociate group to image', error);
    }
  }

  /**
   * Associate a list of groups to the specified image
   * 
   * @param imageId unique id of image to associate to groups
   * @param groupIds array of group ids to associate to image
   */
  public async addGroupsToImage(imageId: string, groupIds: string[]): Promise<BulkResponse> {
    const bulkResponse = new BulkResponse();
    for (let i = 0; i < groupIds.length; i++) {
      const groupId = groupIds[i];
      try {
        await this.addGroupToImage(imageId, groupId);
        bulkResponse.addSuccess(groupId);
      } catch (error) {
        bulkResponse.addError(groupId, error.message);
      }
    }
    return bulkResponse;
  }

  /**
   * Associate a group to an image
   * 
   * @param imageId unique id of image to associate to group
   * @param groupId unique id of group to associate to image
   */
  public async addGroupToImage(imageId: string, groupId: string): Promise<any> {
    try {
      const group = await this.getGroupImage(imageId, groupId);
      if (!group) {
        const model = { imageId, groupId };
        // When the sequelize models are in Typescript, this could be a SequelizeService<ImageGroup>
        // @ts-ignore-next-line
        const result = await this.imageGroupModel.create(model);
        return result;
      } else {
        throw this.getApiError(HttpStatus.CONFLICT, 'Group is already associated with image');
      }
    } catch (error) {
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, 'Unable to associate group to image', error);
    }
  }
}