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
   * Get image associated with group
   * 
   * @param groupId unique id of group to search for
   * @param imageId unique id of image to search for
   */
  public async getImageGroup(groupId: string, imageId: string): Promise<any> {
    try {
      // @ts-ignore-next-line
      const response = await this.model.getImageGroup(groupId, imageId, this.groupModel);
      return response;
    } catch (error) {
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, `Error retrieving images from group (${groupId})`, error);
    }
  }

  /**
   * Get all images associated with a specific group
   * 
   * @param groupId unique id of group to search for
   * @param limit number of items to return
   * @param page range of items to return
   * @param filter object with properties to query with
   */
  public async listImagesForGroup(groupId: string, limit: number, page: number, filter: any): Promise<PaginationResponse> {
    try {
      // @ts-ignore-next-line
      const result = await this.model.listImagesForGroup(groupId, this.groupModel, limit, page, filter);
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
   * Disassociate a list of images from the specified group
   * 
   * @param groupId unique id of group to disassociate from images
   * @param imageIds array of image ids to disassociate from group
   */
  public async removeImagesFromGroup(groupId: string, imageIds: string[]): Promise<BulkResponse> {
    const bulkResponse = new BulkResponse();
    for (let i = 0; i < imageIds.length; i++) {
      const imageId = imageIds[i];
      try {
        await this.removeImageFromGroup(groupId, imageId);
        bulkResponse.addSuccess(imageId);
      } catch (error) {
        bulkResponse.addError(imageId, error.message);
      }
    }
    return bulkResponse;
  }

  /**
   * Disassociate an image from the specified group
   * 
   * @param groupId unique id of group to disassociate from images
   * @param imageId unique id of image to disassociate from groups
   */
  public async removeImageFromGroup(groupId: string, imageId: string) {
    try {
      // When the sequelize models are in Typescript, this could be a SequelizeService<ImageGroup>
      // @ts-ignore
      const response = await this.model.imageGroupModel.destroy({ where: { imageId, groupId } })
      if (response > 0) return response;
      else throw this.getApiError(HttpStatus.CONFLICT, 'Image is not associated with group');
    } catch (error) {
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, 'Unable to disassociate image from group', error);
    }
  }

  /**
   * Associate a list of images to the specified group
   * 
   * @param groupId unique id of group to associate to images
   * @param imageIds array of image ids to associate to group
   */
  public async addImagesToGroup(groupId: string, imageIds: string[]): Promise<BulkResponse> {
    const bulkResponse = new BulkResponse();
    for (let i = 0; i < imageIds.length; i++) {
      const imageId = imageIds[i];
      try {
        const image = await this.getImageGroup(groupId, imageId);
        if (!image) {
          await this.addImageToGroup(groupId, imageId);
          bulkResponse.addSuccess(imageId);
        } else {
          bulkResponse.addError(imageId, 'Image already exists in group');
        }
      } catch (error) { bulkResponse.addError(imageId, error.message); }
    }
    return bulkResponse;
  }

  /**
   * Associate an image to a group
   * 
   * @param groupId unique id of group to associate to image
   * @param imageId unique id of image to associate to groups
   */
  public async addImageToGroup(groupId: string, imageId: string): Promise<any> {
    try {
      const image = await this.getImageGroup(groupId, imageId);
      if (!image) {
        const model = { groupId, imageId };
        // When the sequelize models are in Typescript, this could be a SequelizeService<ImageGroup>
        // @ts-ignore-next-line
        const result = await this.imageGroupModel.create(model);
        return result;
      } else {
        throw this.getApiError(HttpStatus.CONFLICT, 'Image is already associated with group');
      }
    } catch (error) {
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, 'Unable to associate image to group', error);
    }
  }
}