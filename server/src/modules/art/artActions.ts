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

const updateAccepted: RequestHandler = async (req, res, next) => {
  try {
    const pos_x = req.body.coordinates.latLong[0];
    const pos_y = req.body.coordinates.latLong[1];
    const name = req.body.fileName;
    const path = req.body.filePath;
    const userId = req.body.userId;
    const city = req.body.coordinates.city;
    const address = req.body.coordinates.address;

    const affectedRows = await artRepository.updateValidation(
      pos_x,
      pos_y,
      name,
      path,
      userId,
      city,
      address,
    );
    if (!affectedRows) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default { browseAround, updateAccepted };
