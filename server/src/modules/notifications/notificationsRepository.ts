import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class notificationsRepository {
  async create(artPieceId: number, userId: string) {
    const query =
      "INSERT INTO notifications(art_piece_id, user_id) VALUES (?, ?)";
    const [result] = await databaseClient.query<Result>(query, [
      artPieceId,
      userId,
    ]);

    return result.affectedRows;
  }
  async update(artPieceId: number, userId: string, status: number) {
    const query =
      "UPDATE notifications SET status = ? WHERE art_piece_id = ? AND user_id = ?";
    const [result] = await databaseClient.query<Result>(query, [
      status,
      artPieceId,
      userId,
    ]);

    return result.affectedRows;
  }
  async read(id: number) {
    // Execute the SQL SELECT query to retrieve all notifications of an user by its ID
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM notifications WHERE user_id = ? AND status IS NOT NULL ORDER BY created_at DESC",
      [id],
    );

    // Return the notifications
    return rows as Notification[];
  }
  async setRead(id: number) {
    // Execute the SQL SELECT query to change all notifications status to TRUE based on user_id
    const [result] = await databaseClient.query<Result>(
      "UPDATE notifications SET viewed_at = NOW() WHERE user_id = ? AND viewed_at IS NULL AND status IS NOT NULL",
      [id],
    );

    return result.affectedRows;
  }
}

export default new notificationsRepository();
