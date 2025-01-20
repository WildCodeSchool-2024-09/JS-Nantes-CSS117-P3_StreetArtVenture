import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

interface statisticsData {
  nb_art_pieces: number;
  nb_users: number;
  nb_city: number;
}

class StatsRepository {
  async getUserStatistics() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT COUNT(*) AS nb_users FROM user",
    );
    return rows as Partial<statisticsData>[];
  }
  async getArtPieceNumber() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT COUNT(*) AS nb_art_pieces FROM art_piece",
    );
    return rows as Partial<statisticsData>[];
  }
  async getArtPieceCitiesNumber() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT COUNT(DISTINCT(city)) AS nb_city FROM art_piece;",
    );
    return rows as Partial<statisticsData>[];
  }
}
export default new StatsRepository();
