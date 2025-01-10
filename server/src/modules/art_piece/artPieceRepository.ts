import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

interface ArtPiece {
  id: number;
  city: string;
}

type ArtCard = {
  name: string;
  adress?: string;
  city: string;
  department: string;
  coordinates: string; // Exemple : "POINT(12.34 56.78)"
  is_validated: boolean;
  is_covered: boolean;
  description: string;
};

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
      "select id, name, picture_path, adress, city, department, coordinates, is_validated, is_covered, description, points_value FROM art_piece;",
    );
    return rows as ArtCard[];
  }
}

export default new ArtPieceRepository();
