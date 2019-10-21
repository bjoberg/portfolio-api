import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";

import ServerError from "../errors/server.error";
import AuthenticationError from "../errors/authentication.error";
import AuthorizationError from "../errors/authorization.error";
import httpStatus from "http-status";

export default class AuthController {
  private user = require("../database/models").user;

  constructor(private oAuth2Client: OAuth2Client) {}

  /**
   * Validate the request for a bearer token
   */
  public validateRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = this.getToken(req);
      // Note: If the server can get the googleId, the provided token is valid
      const googleId = await this.getGoogleId(token);
      if (googleId) {
        if (await this.isAuthorizedUser(googleId)) next();
        else {
          const authorizationError = new AuthorizationError(
            "User is not authorized to access this resource"
          );
          next(authorizationError.getError);
        }
      } else {
        const authenticationError = new AuthenticationError(
          "Provided token has expired or is invalid"
        );
        next(authenticationError.getError);
      }
    } catch (error) {
      if (error instanceof ServerError) next(error.getError());
      if (error instanceof AuthenticationError) next(error.getError());
      if (error instanceof AuthorizationError) next(error.getError());
      else {
        const serverError = new ServerError(
          "Error while validating request object"
        );
        next(serverError.getError());
      }
    }
  };

  /**
   * Get the bearer token from the provided request object
   * @param req Express Request object to get bearer token from
   * @throws AuthenticationError when request's authorization is invalid
   */
  private getToken(req: Request): string {
    const authorizationHeader = req.headers["authorization"];
    if (authorizationHeader === undefined)
      throw new AuthenticationError("Authorization header was not provided");

    const authorization: string[] = authorizationHeader.split(" ");
    if (authorization.length !== 2)
      throw new AuthenticationError("Malformed Authorization header");
    if (authorization[0].toLowerCase() !== "bearer")
      throw new AuthenticationError("Malformed Authorization header");
    return authorization[1];
  }

  /**
   * Get the google id for the provided bearer token
   * @param token bearer token to get information with
   * @throws AuthenticationError when when the token is invalid
   */
  private async getGoogleId(token: string): Promise<string | undefined> {
    try {
      const tokenInfo = await this.oAuth2Client.getTokenInfo(token);
      return tokenInfo.sub;
    } catch (error) {
      throw new AuthenticationError("Provided token has expired or is invalid");
    }
  }

  /**
   * Check to see if a user is authorized
   * @param googleId id to check authorization status
   * @throws AuthorizationError when when the id does not have valid access rights
   */
  private async isAuthorizedUser(googleId: String): Promise<boolean> {
    try {
      const user = await this.user.getByGoogleId(googleId);
      // Note: user is authorized if they exist in the database
      if (user) return true;
      return false;
    } catch (error) {
      if (error.status === httpStatus.NOT_FOUND)
        throw new AuthorizationError(
          "User is not authorized to access this resource"
        );
      else throw new ServerError("Error checking user authorization");
    }
  }
}
