import type { RequestHandler } from "express";
import reportedArtPieceRepository from "./reportedArtPieceRepository";

// Reste de ton code ici

const getUserSignalement: RequestHandler = async (req, res, next) => {
  try {
    const reportedArtPiece = await reportedArtPieceRepository.readAll();

    res.json(reportedArtPiece);
  } catch (err) {
    console.error(err);
  }
};

export default { getUserSignalement };
