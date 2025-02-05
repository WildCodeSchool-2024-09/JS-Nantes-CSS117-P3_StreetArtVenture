import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
import type { ArtPiece } from "../../types/express/artPiece";

class artRepository {
  async readAll() {
    const query =
      "SELECT id, name, adress, city, coordinates, is_validated, is_covered, picture_path, description, points_value  FROM art_piece";
    // Execute the SQL SELECT query to retrieve all art pieces
    const [rows] = await databaseClient.query<Rows>(query);

    // Return the array of art pieces
    return rows as ArtPiece[];
  }

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

  async approveArtPiece(id: number) {
    const query = "UPDATE art_piece SET is_validated = TRUE WHERE id = ?";
    const [result] = await databaseClient.query<Result>(query, [id]);
    return result.affectedRows;
  }

  async deleteArtPiece(id: number) {
    const query = "DELETE FROM art_piece WHERE id = ?";
    const [result] = await databaseClient.query<Result>(query, [id]);
    return result.affectedRows;
  }
  async updateValidation(
    pos_x: number,
    pos_y: number,
    name: string,
    path: string,
    userId: number,
    city: string,
    address: string,
  ) {
    const query = `
    INSERT INTO art_piece 
    (name, user_id, adress, city, coordinates, is_validated, is_covered, picture_path, description, points_value) 
    VALUES (?, ?, ?, ?, POINT(?, ?), 0, 0, ?, NULL, NULL)
  `;

    const [result] = await databaseClient.query<Result>(query, [
      name,
      userId,
      address,
      city,
      pos_x,
      pos_y,
      path,
      null,
      null,
    ]);
    return result.insertId;
  }
}

export default new artRepository();
