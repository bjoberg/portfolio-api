import SequelizeService from "./sequelize.service";
import { Model } from "sequelize/types";
import EntityList from "../utils/models/enity-list";
import ApiError from "../utils/models/api-error";
import HttpStatus from "http-status";

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
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = `Error retrieving images from group (${groupId})`;
      if (error.status) status = error.status;
      if (error.message) message = error.message;
      const apiError: ApiError = { status, message };
      throw apiError;
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
  public async listImagesForGroup(groupId: string, limit: number, page: number, filter: any): Promise<EntityList> {
    try {
      // @ts-ignore-next-line
      const response = await this.model.listAllForGroup(groupId, this.groupModel, limit, page, filter);
      const entityList: EntityList = {
        limit,
        page,
        totalItems: response.count,
        pageCount: response.rows.length,
        rows: response.rows
      };
      return entityList;
    } catch (error) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = `Error retrieving images from group (${groupId})`;
      if (error.status) status = error.status;
      if (error.message) message = error.message;
      const apiError: ApiError = { status, message };
      throw apiError;
    }
  }

  /**
   * Remove images from the specified group
   * 
   * @param groupId unique id of group to delete images from
   * @param imageIds array of image ids to remove from group
   */
  public async removeImagesFromGroup(groupId: string, imageIds: string[]): Promise<any> {
    let success = [];
    let errors = [];
    for (let i = 0; i < imageIds.length; i++) {
      const imageId = imageIds[i];
      try {
        // @ts-ignore-next-line
        const response = await this.model.removeImageFromGroup(groupId, imageId, this.imageGroupModel);
        if (response > 0) success.push(imageId);
        else errors.push(imageId);
      } catch (error) {
        errors.push(imageId);
      }
    }
    return {
      success,
      errors
    };
  }

  /**
   * Add images from the specified group
   * 
   * @param groupId unique id of group to delete images from
   * @param imageIds array of image ids to remove from group
   */
  public async addImagesToGroup(groupId: string, imageIds: string[]): Promise<any> {
    let success = [];
    let errors = [];
    for (let i = 0; i < imageIds.length; i++) {
      const imageId = imageIds[i];
      try {
        const image = await this.getImageInGroup(groupId, imageId);
        if (!image) {
          // @ts-ignore-next-line
          await this.model.addImageToGroup(groupId, imageId, this.imageGroupModel);
          success.push(imageId);
        } else {
          errors.push({ id: imageId, status: `Image already exists in group.` });
        }
      } catch (error) {
        errors.push({ id: imageId, status: error.message });
      }
    }
    return { success, errors };
  }
}