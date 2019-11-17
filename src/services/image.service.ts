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
      const apiError: ApiError = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
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
}