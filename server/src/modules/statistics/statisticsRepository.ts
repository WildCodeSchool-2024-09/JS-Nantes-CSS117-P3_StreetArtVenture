import { verify } from "node:crypto";
import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

interface Testtype {
  jsp: string;
}

class StatsRepository {
  async getUserStatistics() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT COUNT(*) AS nb_users FROM user",
    );
    return rows as Testtype[];
  }
  async getArtPiecesStatistics() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT COUNT(*) AS nb_art_pieces FROM art_piece",
    );
    return rows as Testtype[];
  }
}
export default new StatsRepository();
