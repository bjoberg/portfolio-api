import ApiError from "../utils/models/api-error";
import HttpStatus from "http-status-codes";

export default class InvalidTokenError extends Error {
  private status: number;

  constructor(message?: string) {
    super(message);
    this.status = HttpStatus.FORBIDDEN;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, InvalidTokenError.prototype);
  }

  /**
   * Get the ApiError object
   */
  getError(): ApiError {
    return {
      status: this.status,
      message: this.message || "Invalid token"
    } as ApiError;
  }
}
