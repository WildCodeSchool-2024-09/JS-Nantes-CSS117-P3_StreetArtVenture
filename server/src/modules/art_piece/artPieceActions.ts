import type { RequestHandler } from "express";
import artPieceRepository from "./artPieceRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const artPiece = await artPieceRepository.readAll();

    res.json(artPiece);
  } catch (err) {
    console.error(err);
  }
};

export { browse };
