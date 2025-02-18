import type { RequestHandler } from "express";
import type { ArtCardChange } from "./ArtCardType";
import artPieceRepository from "./artPieceRepository";

const getCities: RequestHandler = async (req, res, next) => {
  try {
    const cities = await artPieceRepository.getCities();
    const artCard = await artPieceRepository.getArt();
    res.json({ cities, artCard });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des données");
  }
};

const edit: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    console.warn("aled", id);
    const { title, description, points, adress } = req.body;
    const updatedPiece = {
      name: title,
      points_value: points,
      description,
      adress,
    } as ArtCardChange;

    const editArtPiece = await artPieceRepository.update(updatedPiece, id);

    if (editArtPiece) {
      res.sendStatus(204);
    } else {
      res.status(403).send("An error occurred");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la mise à jour de l'œuvre");
  }
};

export default { getCities, edit };
