import databaseClient from "../../../../database/client";

import type { Rows } from "../../../../database/client";

interface cities {
  city: string;
}

interface user {
  id: number;
}

class leaderboardRepository {
  async getCities() {
    const query = "SELECT DISTINCT city FROM user";
    const [rows] = await databaseClient.query<Rows>(query);

    return rows as cities[];
  }

  async getLeaderboard(city?: string, name?: string, offset?: string) {
    console.info(city, name, offset);
    const params = [];
    let query = "SELECT id, points, name FROM user ";
    if (city && name) {
      query += "WHERE city = ? AND name LIKE ? ";
      params.push(city);
      params.push(`%${name}%`);
    } else if (city) {
      query += "WHERE city = ? ";
      params.push(city);
    } else if (name) {
      query += "WHERE name LIKE ? ";
      params.push(`%${name}%`);
    }
    query += "ORDER BY points DESC LIMIT 10 ";
    if (offset) {
      query += "OFFSET ?";
      params.push(Number.parseInt(offset));
    }
    console.info(query);
    console.info(params);
    const [rows] = await databaseClient.query<Rows>(query, params);

    return rows as user[];
  }

  async getUserData(id: string) {
    // as rank is a keyword in SQL, I need to put ` around it and escape the backticks with \
    const query = `
    SELECT id, name, points, \`rank\`
    FROM (
      SELECT id, name, points, RANK() OVER (ORDER BY points DESC) AS \`rank\`
      FROM user
    ) AS ranked_users
    WHERE id = ?;
  `;
    const [rows] = await databaseClient.query<Rows>(query, [id]);

    console.info(rows);
    return rows as user[];
  }
}

export default new leaderboardRepository();
