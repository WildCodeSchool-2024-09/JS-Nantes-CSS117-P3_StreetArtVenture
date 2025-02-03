import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

import type { ReportedArtPIece } from "../reported_art_piece/types/reportedArtPiece";

class ReportedArtPieceRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT r.picture_path AS report_img_path, a.picture_path AS reported_img_path, r.art_piece_id, r.user_id, r.timestamp, u.pseudo AS user_name, a.coordinates, a.name AS art_piece_name FROM reported_art_piece r INNER JOIN user u ON r.user_id = u.id INNER JOIN art_piece a ON r.art_piece_id = a.id;",
    );
    return rows as ReportedArtPIece[];
  }

  async validateReport(artPieceId: number) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE art_piece SET is_covered = true WHERE id = ?",
      [artPieceId],
    );
    return result.affectedRows;
  }

  async refuseReport(artPieceId: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM reported_art_piece WHERE art_piece_id = ?",
      [artPieceId],
    );
    return result;
  }
}

export default new ReportedArtPieceRepository();
