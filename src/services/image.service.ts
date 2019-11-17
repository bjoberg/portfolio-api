import SequelizeService from "./sequelize.service";
import { Model } from "sequelize/types";
import EntityList from "../utils/models/enity-list";
import ApiError from "../utils/models/api-error";
import HttpStatus from "http-status";

export default class ImageService extends SequelizeService {
  private groupModel: Model;

  /**
   * Construct a new image service
   * 
   * @param imageModel image model definition
   * @param groupModel group model definition
   */
  constructor(imageModel: Model, groupModel: Model) {
    super(imageModel);
    this.groupModel = groupModel;
  }

  /**
   * Get all images in a specific group
   * 
   * @param groupId unique id of group to search for
   * @param limit number of items to return
   * @param page range of items to return
   * @param filter object with properties to query with
   */
  public async listAllForGroup(groupId: string, limit: number, page: number, filter: any): Promise<EntityList> {
    try {
      // @ts-ignore
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
}