import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class notificationsRepository {
  async read(id: number) {
    // Execute the SQL SELECT query to retrieve all notifications of an user by its ID
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC",
      [id],
    );

    // Return the notifications
    return rows as Notification[];
  }
  async setRead(id: number) {
    // Execute the SQL SELECT query to change all notifications status to TRUE based on user_id
    const [result] = await databaseClient.query<Result>(
      "UPDATE notifications SET viewed_at = NOW() WHERE user_id = ? AND viewed_at IS NULL",
      [id],
    );

    // Return the notifications
    return result.affectedRows;
  }
}

export default new notificationsRepository();
