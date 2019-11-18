import SequelizeService from "./sequelize.service";
import { Model } from "sequelize/types";
import HttpStatus from "http-status";

import PaginationResponse from "../utils/models/pagination-response.interface";
// import BulkResponse from "../utils/models/bulk-response.model";

export default class GroupService extends SequelizeService {
  private imageModel: Model;
  // private imageGroupModel: Model;

  /**
   * Construct a new tag service
   * 
   * @param groupModel group model definition
   * @param imageModel image model definition
   * @param imageGroupModel imageGroup model definition 
   */
  constructor(groupModel: Model, imageModel: Model, imageGroupModel: Model) {
    super(groupModel);
    this.imageModel = imageModel;
    // this.imageGroupModel = imageGroupModel;
  }

  /**
   * Get groups for a specific image
   * 
   * @param imageId unique id of image to search for
   * @param groupId unique id of group to search for
   */
  public async getImageGroups(imageId: string, groupId: string): Promise<any> {
    try {
      // @ts-ignore-next-line
      const response = await this.model.getImageGroups(imageId, groupId, this.imageModel);
      return response;
    } catch (error) {
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, `Error retrieving groups for image (${imageId})`, error);
    }
  }

  /**
   * Get all groups associated with an image
   * 
   * @param imageId unique id of image to search for
   * @param limit number of items to return
   * @param page range of items to return
   * @param filter object with properties to query with
   */
  public async listGroupsForImage(imageId: string, limit: number, page: number, filter: any): Promise<PaginationResponse> {
    try {
      // @ts-ignore-next-line
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
      throw this.getApiError(HttpStatus.INTERNAL_SERVER_ERROR, `Error retrieving group associated with image (${imageId})`, error);
    }
  }

}