import path from "node:path";
import type { RequestHandler } from "express";
import type { Request, Response } from "express";
import multer from "multer";
import type { JWTPayload } from "../../types/express/auth";
import notificationsRepository from "../notifications/notificationsRepository";
import userRepository from "../user/userRepository";
import artRepository from "./artRepository";

const readAll: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all art pieces
    const items = await artRepository.readAll();

    // Respond with the items in JSON format
    res.json(items);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const update: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    if (!id) {
      res.status(400).json({ error: "ID invalide." });
      return;
    }

    if (Object.keys(updatedFields).length === 0) {
      res.status(400).json({ error: "Aucune donnée à mettre à jour." });
      return;
    }

    const affectedRows = await artRepository.update(id, updatedFields);

    if (affectedRows === 0) {
      res.status(404).json({ error: "Aucune oeuvre trouvée avec cet ID." });
      return;
    }

    res.json(affectedRows);
  } catch (err) {
    next(err);
  }
};

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
    const artPieceId = req.params.id;
    const { ArtTitle, comment, userId, pointsValue } = req.body;
    const artValidation = await artRepository.approveArtPiece(
      artPieceId,
      ArtTitle,
      comment,
      pointsValue,
    );
    if (!artValidation) {
      res.sendStatus(404);
    } else {
      const userId = (res.locals as JWTPayload).id;
      if (userId) notificationsRepository.update(artPieceId, userId, 1);
      const pointsGiven = await userRepository.addCreationPoints(
        userId,
        req.body.pointsValue,
      );
      if (pointsGiven)
        res.status(200).send("Art piece has been validated and points given!");
      else
        res
          .status(202)
          .send(
            "Art piece has been validated but there was a problem with points distribution",
          );
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
      const { userId } = req.body;
      if (userId) notificationsRepository.update(`${id}`, userId, 0);
      res.status(200).send("Art piece has been denied !");
    }
  } catch (err) {
    next(err);
  }
};

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

    const artPieceId = await artRepository.updateValidation(
      pos_x,
      pos_y,
      name,
      path,
      userId,
      city,
      address,
    );
    if (!artPieceId) {
      res.sendStatus(404);
    } else {
      // Create notification with default values waiting for admin validation
      notificationsRepository.create(artPieceId, userId);
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const report: RequestHandler = async (req, res, next) => {
  try {
    const { filePath: path, userId, artId } = req.body;

    const affectedRows = await artRepository.reportValidation(
      path,
      userId,
      artId,
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
  readAll,
  update,
  browseAround,
  updateAccepted,
  multerAndSkully,
  savePicture,
  unvalidatedArtPiece,
  editArtPiece,
  denyArtPiece,
  report,
};
