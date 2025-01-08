import type { RequestHandler } from "express";

const browse: RequestHandler = (req, res, next) => {
  res.send("coucou");
};

export { browse };
