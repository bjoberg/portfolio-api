import ApiError from "../utils/models/api-error";
import HttpStatus from "http-status";

export default class ServerError extends Error {
  private status: number;

  constructor(message?: string) {
    super(message);
    this.status = HttpStatus.INTERNAL_SERVER_ERROR;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ServerError.prototype);
  }

  /**
   * Get the ApiError object
   */
  getError(): ApiError {
    return {
      status: this.status,
      message: this.message || "Internal server error"
    } as ApiError;
  }
}
