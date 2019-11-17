import ApiError from "../utils/models/api-error.interface";
import HttpStatus from "http-status";

export default class AuthenticationError extends Error {
  private status: number;

  constructor(message?: string) {
    super(message);
    this.status = HttpStatus.FORBIDDEN;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AuthenticationError.prototype);
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
