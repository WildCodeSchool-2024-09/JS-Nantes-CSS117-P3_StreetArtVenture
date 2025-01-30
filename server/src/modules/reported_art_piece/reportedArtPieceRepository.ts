import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

interface ReportedArtPIece {
  art_piece_id: string;
  user_id: string;
  timestamp: string;
  name: string;
  coordinates: string;
}

class ReportedArtPieceRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>(
      "SELECT r.picture_path AS report_img_path, a.picture_path AS reported_img_path, r.art_piece_id, r.user_id, r.timestamp, u.name AS user_name, a.coordinates, a.name AS art_piece_name FROM reported_art_piece r  INNER JOIN user u ON r.user_id = u.id  INNER JOIN art_piece a ON r.art_piece_id = a.id",
    );
    return rows as ReportedArtPIece[];
  }
}

export default new ReportedArtPieceRepository();
