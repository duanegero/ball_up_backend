import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AthletePayload } from "../helpers/types";
const apiKey = process.env.API_KEY;

//check for api key
if (!apiKey) {
  throw new Error("API_KEY is not set in environment variables.");
}

//extend request to include athlete property
export interface AuthenticatedRequest extends Request {
  athlete?: AthletePayload;
}

//function to verify the athlete
const athleteVerifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  //variable to handle authorization in header
  const authHeader = req.headers["authorization"];

  //if no header return error status
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  //varible to handle token after split for auth header
  const token = authHeader.split(" ")[1];

  //if no token return error status json
  if (!token) {
    return res.status(401).json({ message: "Token is missing or wrong." });
  }

  try {
    //verify token, cast payload
    const decoded = jwt.verify(token, apiKey) as AthletePayload;

    //attach to request object
    req.athlete = decoded;

    next();
  } catch (error: any) {
    //catch if any error, log and respond error status
    console.error("JWT verification error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }

    res.status(401).json({ message: "Invalid token" });
  }
};

export { athleteVerifyToken };
