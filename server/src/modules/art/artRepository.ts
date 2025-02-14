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

  async update(id: string, updatedFields: Partial<Omit<ArtPiece, "id">>) {
    // On filtre les éléments absent
    const fields = Object.keys(updatedFields).filter(
      (key) => updatedFields[key as keyof typeof updatedFields] !== undefined,
    );

    // Si il n'y a rien a modifier
    if (fields.length === 0) {
      throw new Error("Aucune donnée à mettre à jour.");
    }

    const setFields = fields.map((field) => `${field} = ?`);
    const values = fields.map(
      (field) => updatedFields[field as keyof typeof updatedFields],
    );
    values.push(id);
    const query = `UPDATE art_piece SET ${setFields} WHERE id = ?`;

    const [result] = await databaseClient.query<Result>(query, values);

    return result.affectedRows;
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

  async approveArtPiece(
    id: string,
    ArtTitle: string,
    comment: string,
    pointsValue: string,
  ) {
    const query =
      "UPDATE art_piece SET is_validated = TRUE, name = ?, description = ?, points_value = ?  WHERE id = ?";
    const [result] = await databaseClient.query<Result>(query, [
      ArtTitle,
      comment,
      pointsValue,
      id,
    ]);
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

  async reportValidation(path: string, userId: number, artId: number) {
    const query = `
    INSERT INTO reported_art_piece  
    (art_piece_id, picture_path, user_id, timestamp)  
    VALUES (?, ?, ?, NOW())
  `;

    const [result] = await databaseClient.query<Result>(query, [
      artId,
      path,
      userId,
    ]);
    return result.affectedRows;
  }
}

export default new artRepository();
