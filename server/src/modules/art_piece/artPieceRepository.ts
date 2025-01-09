import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

interface ArtPiece {
  id: number;
  city: string;
}
class ArtPieceRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>(
      "select city FROM user GROUP BY city",
    );

    // Return the array of items
    return rows as ArtPiece[];
  }
}

export default new ArtPieceRepository();
