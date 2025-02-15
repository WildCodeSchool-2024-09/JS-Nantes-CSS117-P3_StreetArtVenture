import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { ArtCard, ArtCardChange, ArtPieceGallery } from "./ArtCardType";

interface ArtPiece {
  id: number;
  city: string;
}

class ArtPieceRepository {
  create(body: ArtPieceGallery) {
    throw new Error("Method not implemented.");
  }
  async getCities() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>(
      "select city FROM art_piece GROUP BY city",
    );

    // Return the array of items
    return rows as ArtPiece[];
  }

  async getArt() {
    const [rows] = await databaseClient.query(
      "select id, name, picture_path, adress, city, coordinates, is_validated, is_covered, description, points_value FROM art_piece WHERE is_validated = 1;",
    );
    return rows as ArtCard[];
  }
  async update(artPiece: ArtCardChange) {
    const [row] = await databaseClient.query<Result>(
      "UPDATE art_piece SET name = ?, adresse = ?, description = ?, points_value = ?  WHERE id =?",
      [
        artPiece.name,
        artPiece.adress,
        artPiece.description,
        artPiece.points_value,
      ],
    );
    return row.affectedRows;
  }
}

export default new ArtPieceRepository();
