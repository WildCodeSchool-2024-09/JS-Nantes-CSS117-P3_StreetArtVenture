import type { RequestHandler } from "express";
import artPieceRepository from "./artPieceRepository";

const getCities: RequestHandler = async (req, res, next) => {
  try {
    const cities = await artPieceRepository.getCities();
    const artCard = await artPieceRepository.getArt();
    res.json({ cities, artCard });
  } catch (err) {
    console.error(err);
  }
};

export default { getCities };
