import ApiError from "../utils/models/api-error";
import httpStatus from "http-status";

export default class AuthorizationError extends Error {
  private status: number;

  constructor(message?: string) {
    super(message);
    this.status = httpStatus.UNAUTHORIZED;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }

  /**
   * Get the ApiError object
   */
  getError(): ApiError {
    return {
      status: this.status,
      message: this.message || "User not found"
    } as ApiError;
  }
}
