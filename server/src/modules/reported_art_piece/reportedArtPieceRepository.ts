import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
interface ReportedArtPIece {
  art_piece_id: string;
  user_id: string;
  timestamp: string;
}

class ReportedArtPieceRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>(
      "SELECT art_piece_id, user_id, timestamp from reported_art_piece",
    );
    return rows as ReportedArtPIece[];
  }
}

export default new ReportedArtPieceRepository();
