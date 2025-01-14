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
const getArt: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const artCard = await artPieceRepository.getArt();

    // Respond with the items in JSON format
    res.json(artCard);
  } catch (err) {
    console.error(err);
  }
};

export default { getCities, getArt };
