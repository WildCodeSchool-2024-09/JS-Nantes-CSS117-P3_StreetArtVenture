import type { RequestHandler } from "express";

// Import access to data
import artRepository from "./artRepository";

const browseAround: RequestHandler = async (req, res, next) => {
  try {
    const { latitude, longitude, radius } = req.query;
    if (!latitude || !longitude) res.status(400).send("Missing parameters");
    // Fetch all items
    const items = await artRepository.browseAround(
      Number.parseFloat(latitude as string),
      Number.parseFloat(longitude as string),
      Number.parseFloat(radius as string),
    );

    // Respond with the items in JSON format
    res.json(items);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const unvalidatedArtPiece: RequestHandler = async (req, res, next) => {
  try {
    const items = await artRepository.unvalidatedArtPiece();
    res.json(items);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const artValidation = await artRepository.update(id);
    if (!artValidation) {
      res.sendStatus(404);
    } else {
      res.status(200).send("Art piece has been validated !");
    }
  } catch (err) {
    next(err);
  }
};

export default { browseAround, unvalidatedArtPiece, edit };
