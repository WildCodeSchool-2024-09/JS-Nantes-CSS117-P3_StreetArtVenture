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

const readAll: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all art pieces
    const items = await artPieceRepository.readAll();

    // Respond with the items in JSON format
    res.json(items);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { getCities, readAll };
