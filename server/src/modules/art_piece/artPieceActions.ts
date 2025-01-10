import type { RequestHandler } from "express";
import artPieceRepository from "./artPieceRepository";

const getCities: RequestHandler = async (req, res, next) => {
  try {
    const artPiece = await artPieceRepository.getCities();

    res.json(artPiece);
  } catch (err) {
    console.error(err);
  }
};

export default { getCities };
