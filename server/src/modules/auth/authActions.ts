import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import type { JWTPayload } from "../../types/express/auth";

const verifyToken: RequestHandler = (req, res, next) => {
  try {
    // Verify that header is present in the req
    const authorizationHeader = req.get("Authorization");
    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    // Verify Bearer presence
    const [type, token] = authorizationHeader.split(" ");
    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    // Check validity of the token
    res.locals = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JWTPayload;

    next();
  } catch (err) {
    // Send status 401 as token is not valid
    res.sendStatus(401);
  }
};

const verifyAdmin: RequestHandler = (req, res, next) => {
  if (!res.locals || !res.locals.isAdmin) res.sendStatus(401);
  else next();
};

export default { verifyToken, verifyAdmin };
