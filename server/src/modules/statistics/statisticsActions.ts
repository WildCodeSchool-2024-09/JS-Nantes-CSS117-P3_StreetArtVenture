import type { RequestHandler } from "express";
import statisticsRepository from "./statisticsRepository";

const getUserStatistics: RequestHandler = async (req, res, next) => {
  try {
    const stats = await statisticsRepository.getUserStatistics();
    if (!stats) res.sendStatus(404);
    else res.json(stats);
  } catch (err) {
    next(err);
  }
};

const getArtPiecesStatistics: RequestHandler = async (req, res, next) => {
  try {
    const stats = await statisticsRepository.getArtPiecesStatistics();
    if (!stats) res.sendStatus(404);
    else res.json(stats);
  } catch (err) {
    next(err);
  }
};

export default { getUserStatistics, getArtPiecesStatistics };
