import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";

interface Cities {
  city: string[];
}

interface User {
  id: number;
}

class leaderboardRepository {
  async getCities() {
    const query = "SELECT DISTINCT city FROM user";
    const [rows] = await databaseClient.query<Rows>(query);

    return rows as Cities[];
  }

  async getLeaderboard(city?: string, username?: string, offset?: string) {
    const params = [];
    let query = "SELECT id, points, username FROM user ";
    if (city && username) {
      query += "WHERE city = ? AND username LIKE ? ";
      params.push(city);
      params.push(`%${username}%`);
    } else if (city) {
      query += "WHERE city = ? ";
      params.push(city);
    } else if (username) {
      query += "WHERE username LIKE ? ";
      params.push(`%${username}%`);
    }
    query += "ORDER BY points DESC LIMIT 10 ";
    if (offset) {
      query += "OFFSET ?";
      params.push(Number.parseInt(offset));
    }

    const [rows] = await databaseClient.query<Rows>(query, params);

    return rows as User[];
  }

  async getAdminLeaderboard(city?: string, username?: string, offset?: string) {
    const params = [];
    let query = "SELECT id, points, username, last_connection FROM user ";
    if (city && username) {
      query += "WHERE city = ? AND username LIKE ? ";
      params.push(city);
      params.push(`%${username}%`);
    } else if (city) {
      query += "WHERE city = ? ";
      params.push(city);
    } else if (username) {
      query += "WHERE username LIKE ? ";
      params.push(`%${username}%`);
    }
    query += "ORDER BY points DESC LIMIT 10 ";
    if (offset) {
      query += "OFFSET ?";
      params.push(Number.parseInt(offset));
    }

    const [rows] = await databaseClient.query<Rows>(query, params);

    return rows as User[];
  }

  async getUserData(id: string) {
    // as rank is a keyword in SQL, I need to put ` around it and escape the backticks with \
    const query = `
    SELECT id, username, points, \`rank\`
    FROM (
      SELECT id, username, points, RANK() OVER (ORDER BY points DESC) AS \`rank\`
      FROM user
    ) AS ranked_users
    WHERE id = ?;
  `;
    const [rows] = await databaseClient.query<Rows>(query, [id]);

    return rows as User[];
  }
}

export default new leaderboardRepository();
