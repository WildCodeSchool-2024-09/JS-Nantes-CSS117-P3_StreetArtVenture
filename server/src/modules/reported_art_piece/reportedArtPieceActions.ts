import type { RequestHandler } from "express";
import userRepository from "../user/userRepository";
import reportedArtPieceRepository from "./reportedArtPieceRepository";

const validate: RequestHandler = async (req, res) => {
  try {
    const artPieceId = req.params.id;

    const result = await reportedArtPieceRepository.validateReport(artPieceId);
    reportedArtPieceRepository.refuseReport(Number.parseInt(artPieceId));

    if (result === 0) {
      res.sendStatus(404);
    } else {
      // On enlève une partie des points des gens qui ont vu l'oeuvre
      userRepository.deductPointsFromRecovery(artPieceId);
      res.sendStatus(200);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Erreur lors de la validation du signalement." });
  }
};

const refuse: RequestHandler = async (req, res) => {
  try {
    const artPieceId = Number.parseInt(req.params.id);
    await reportedArtPieceRepository.refuseReport(artPieceId);
    res.status(200).json({ message: "Signalement refusé avec succès." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression du signalement." });
  }
};

const getUserSignalement: RequestHandler = async (req, res, next) => {
  try {
    const reportedArtPieces = await reportedArtPieceRepository.readAll();
    res.json(reportedArtPieces);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export default { getUserSignalement, validate, refuse };
