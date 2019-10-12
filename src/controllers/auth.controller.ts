import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";

import ServerError from "../errors/server.error";
import InvalidTokenError from "../errors/invalid-token.error";

export default class AuthController {
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
      if (await this.isValidToken(token)) next();
      else
        throw new InvalidTokenError("Provided token has expired or is invalid");
    } catch (error) {
      if (error instanceof InvalidTokenError) next(error.getError());
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
   * @throws InvalidTokenError when request's authorization is invalid
   */
  private getToken(req: Request): string {
    const authorizationHeader = req.headers["authorization"];
    if (authorizationHeader === undefined)
      throw new InvalidTokenError("Authorization header was not provided");

    const authorization: string[] = authorizationHeader.split(" ");
    if (authorization.length !== 2)
      throw new InvalidTokenError("Malformed Authorization header");
    if (authorization[0].toLowerCase() !== "bearer")
      throw new InvalidTokenError("Malformed Authorization header");
    return authorization[1];
  }

  /**
   * Make sure the provided token is valid
   * @param token Token to verify
   */
  private async isValidToken(token: string): Promise<boolean> {
    try {
      const tokenInfo = await this.oAuth2Client.getTokenInfo(token);
      if (tokenInfo) return true;
      return false;
    } catch (error) {
      throw new InvalidTokenError("Provided token has expired or is invalid");
    }
  }
}
