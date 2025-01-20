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
    const numberOfArtPieces = await statisticsRepository.getArtPieceNumber();
    const numberOfCitiesArtPieces =
      await statisticsRepository.getArtPieceCitiesNumber();
    if (!numberOfArtPieces || !numberOfCitiesArtPieces) res.sendStatus(404);
    else
      res.json({
        nb_artpieces: numberOfArtPieces[0].nb_art_pieces,
        nb_cities_art_pieces: numberOfCitiesArtPieces[0].nb_city,
        // nb_artpieces_covered: numberOfCoveredArtPieces[0].nb_covered_art_piece, // t'es ici la tu fais ça
      });
  } catch (err) {
    next(err);
  }
};

export default { getUserStatistics, getArtPiecesStatistics };
