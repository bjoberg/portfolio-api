export default class BulkResponse {
  private success: string[];
  private errors: object[];

  constructor() {
    this.success = [];
    this.errors = [];
  }

  /**
   * Add value to success array
   * 
   * @param val value to add to success array
   */
  public addSuccess(val: string) {
    this.success.push(val);
  }

  /**
   * Add error to errors array
   * 
   * @param id defining error being added to error array
   * @param status status defining error being added to error array
   */
  public addError(id: string, status: string) {
    this.errors.push({ id, status });
  }
}