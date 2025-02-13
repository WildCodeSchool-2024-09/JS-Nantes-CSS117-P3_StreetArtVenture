import type { RequestHandler } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

const isAdmin: RequestHandler = async (req, res, next) => {
  const token = req?.headers?.authorization;
  if (!token) {
    res.status(401).send("Need token");
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      username: string;
      role: string;
      exp: number;
    };

    if (!decoded || decoded.role !== "admin") {
      res.status(401).send("Need to be an administrator");
      return;
    }
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      res.status(401).send("Token expired");
    } else {
      res.status(401).send("Invalid token");
    }
  }
};

export default { isAdmin };
