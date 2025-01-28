import { verify } from "node:crypto";
import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

interface TestType {
  jsp: string;
}

class StatsRepository {
  async getUserStatistics() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT COUNT(*) AS nb_users FROM user",
    );
    return rows as TestType[];
  }
  async getArtPiecesStatistics() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT COUNT(*) AS nb_art_pieces FROM art_piece",
    );
    return rows as TestType[];
  }
  async getPlayerStatistics() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT name FROM user WHERE points = (SELECT MAX(points) FROM user)",
    );
    return rows as TestType[];
  }
}
export default new StatsRepository();
