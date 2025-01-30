import path from "node:path";
import type { RequestHandler } from "express";
import type { Request, Response } from "express";
import multer from "multer";

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

const editArtPiece: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const artValidation = await artRepository.approveArtPiece(id);
    if (!artValidation) {
      res.sendStatus(404);
    } else {
      res.status(200).send("Art piece has been validated !");
    }
  } catch (err) {
    next(err);
  }
};

const denyArtPiece: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const deniedArt = await artRepository.deleteArtPiece(id);
    if (deniedArt === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).send("Art piece has been denied !");
    }
  } catch (err) {
    next(err);
  }
};

//

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/images");
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

const savePicture = upload.single("image");

const multerAndSkully = (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ error: "Aucune image envoyée" });
    return;
  }

  const fileName = req.file.filename;
  const filePath = `/assets/images/${fileName}`;

  res.json({ message: "Image Uploaded", fileName, filePath });
};

const updateAccepted: RequestHandler = async (req, res, next) => {
  try {
    const {
      coordinates: {
        latLong: [pos_x, pos_y],
        city,
        address,
      },
      fileName: name,
      filePath: path,
      userId,
    } = req.body;

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

export default {
  browseAround,
  updateAccepted,
  multerAndSkully,
  savePicture,
  unvalidatedArtPiece,
  editArtPiece,
  denyArtPiece,
};
