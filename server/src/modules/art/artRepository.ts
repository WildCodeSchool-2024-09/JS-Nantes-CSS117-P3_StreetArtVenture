import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";
import type { ArtPiece } from "../../types/express/artPiece";

class artRepository {
  async browseAround(lat: number, lng: number, radius?: number) {
    const query = `SELECT 
    *,
    ST_Distance_Sphere(coordinates, ST_GeomFromText('POINT(? ?)')) / 1000 AS distance_in_km
    FROM art_piece 
    WHERE ST_Distance_Sphere(coordinates, ST_GeomFromText('POINT(? ?)')) <= ? * 1000;`;
    // Execute the SQL SELECT query to retrieve all art pieces <= 50 km around gps coordinates
    const [rows] = await databaseClient.query<Rows>(query, [
      lat,
      lng,
      lat,
      lng,
      radius || 50,
    ]);

    // Return the array of items
    return rows as ArtPiece[];
  }

  async unvalidatedArtPiece() {
    const query = "SELECT * FROM art_piece WHERE is_validated = FALSE LIMIT 1";
    const [row] = await databaseClient.query<Rows>(query);
    return row as ArtPiece[];
  }
}

export default new artRepository();
