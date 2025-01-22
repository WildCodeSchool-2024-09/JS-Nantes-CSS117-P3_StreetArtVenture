import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
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
  async updateValidation(
    name: string,
    adress: string,
    city: string,
    pos_x: number,
    pos_y: number,
    path: string,
  ) {
    const query =
      "UPDATE art_piece SET name = ?,adress = ?, city = ?, coordinates = POINT(? ?), picture_path = ?";

    const [result] = await databaseClient.query<Result>(query, [
      name,
      adress,
      city,
      pos_x,
      pos_y,
      path,
    ]);
    return result.affectedRows;
  }
}

export default new artRepository();
