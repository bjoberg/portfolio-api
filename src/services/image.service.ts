import SequelizeService from "./sequelize.service";
import { Model } from "sequelize/types";
import HttpStatus from "http-status";

import BulkResponse from "../utils/models/bulk-response.model";
import PaginationResponse from "../utils/models/pagination-response.interface";

export default class ImageService extends SequelizeService {
  private groupModel: Model;
  private imageGroupModel: Model;

  /**
   * Construct a new image service
   * 
   * @param imageModel image model definition
   * @param groupModel group model definition
   * @param imageGroupModel imageGroup model definition
   */
  constructor(imageModel: Model, groupModel: Model, imageGroupModel: Model) {
    super(imageModel);
    this.groupModel = groupModel;
    this.imageGroupModel = imageGroupModel;
  }

  /**
   * Get image in a specific group
   * 
   * @param groupId unique id of group to search for
   * @param imageId unique id of image to search for
   */
  public async getImageInGroup(groupId: string, imageId: string): Promise<any> {
    try {
      // @ts-ignore-next-line
      const response = await this.model.getImageInGroup(groupId, imageId, this.groupModel);
      return response;
    } catch (error) {
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, `Error retrieving images from group (${groupId})`, error);
    }
  }

  /**
   * Get all images in a specific group
   * 
   * @param groupId unique id of group to search for
   * @param limit number of items to return
   * @param page range of items to return
   * @param filter object with properties to query with
   */
  public async listImagesForGroup(groupId: string, limit: number, page: number, filter: any): Promise<PaginationResponse> {
    try {
      // @ts-ignore-next-line
      const result = await this.model.listAllForGroup(groupId, this.groupModel, limit, page, filter);
      const response: PaginationResponse = {
        limit,
        page,
        totalItems: result.count,
        pageCount: result.rows.length,
        rows: result.rows
      };
      return response;
    } catch (error) {
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, `Error retrieving images from group (${groupId})`, error);
    }
  }

  /**
   * Remove images from the specified group
   * 
   * @param groupId unique id of group to delete images from
   * @param imageIds array of image ids to remove from group
   */
  public async removeImagesFromGroup(groupId: string, imageIds: string[]): Promise<BulkResponse> {
    const bulkResponse = new BulkResponse();
    for (let i = 0; i < imageIds.length; i++) {
      const imageId = imageIds[i];
      try {
        // @ts-ignore-next-line
        const response = await this.model.removeImageFromGroup(groupId, imageId, this.imageGroupModel);
        if (response > 0) bulkResponse.addSuccess(imageId);
        else bulkResponse.addError(imageId, 'Image did not exist in group');
      } catch (error) {
        bulkResponse.addError(imageId, error.message);
      }
    }
    return bulkResponse;
  }

  /**
   * Add images from the specified group
   * 
   * @param groupId unique id of group to delete images from
   * @param imageIds array of image ids to remove from group
   */
  public async addImagesToGroup(groupId: string, imageIds: string[]): Promise<BulkResponse> {
    const bulkResponse = new BulkResponse();
    for (let i = 0; i < imageIds.length; i++) {
      const imageId = imageIds[i];
      try {
        const image = await this.getImageInGroup(groupId, imageId);
        if (!image) {
          // @ts-ignore-next-line
          await this.model.addImageToGroup(groupId, imageId, this.imageGroupModel);
          bulkResponse.addSuccess(imageId);
        } else {
          bulkResponse.addError(imageId, 'Image already exists in group');
        }
      } catch (error) { bulkResponse.addError(imageId, error.message); }
    }
    return bulkResponse;
  }
}