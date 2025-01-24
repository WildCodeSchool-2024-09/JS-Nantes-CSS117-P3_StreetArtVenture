import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { ArtCard } from "./ArtCardType";

interface ArtPiece {
  id: number;
  city: string;
}

class ArtPieceRepository {
  async getCities() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>(
      "select city FROM user GROUP BY city",
    );

    // Return the array of items
    return rows as ArtPiece[];
  }

  async getArt() {
    const [rows] = await databaseClient.query(
      "select id, name, picture_path, adress, city, coordinates, is_validated, is_covered, description, points_value FROM art_piece;",
    );
    return rows as ArtCard[];
  }
}

export default new ArtPieceRepository();
