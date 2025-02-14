import { verify } from "node:crypto";
import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type User from "../user/userTypes";

class UserRepository {
  async read(id: number) {
    const [row] = await databaseClient.query<Rows>(
      "SELECT username, firstname, lastname, email, zipcode, city, adress FROM user WHERE id = ?",
      [id],
    );
    return row as User[];
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from user");
    return rows as User[];
  }

  async verifyUser(email: string, password: string): Promise<User[] | null> {
    const [rows] = await databaseClient.query<Rows>(
      "select id, is_admin AS isAdmin, is_ban AS isBanned, email from user where email = ? and password = ?",
      [email, password],
    );
    if (rows.length === 0) {
      return null;
    }
    return rows as User[];
  }

  async isUserYet(username: string, email: string): Promise<User[] | null> {
    const [rows] = await databaseClient.query<Rows>(
      "select email, username from user where email = ? or username = ?",
      [email, username],
    );

    return rows as User[];
  }

  async userInscription(
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    zipcode: string,
    adress: string,
    city: string,
    password: string,
  ): Promise<number | null> {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (username, firstname, lastname, email, zipcode, city, adress, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, zipcode, city, adress, password],
    );
    return result.insertId || null;
  }

  async update(id: number, data: User) {
    const query = `UPDATE user SET
    username = ?,
    firstname = ?,
    lastname = ?,
    email = ?,
    adress = ?,
    zipcode = ?,
    city = ?
    WHERE id = ?`;
    const [row] = await databaseClient.query<Rows>(query, [
      data.username,
      data.firstname,
      data.lastname,
      data.email,
      data.adress,
      data.zipcode,
      data.city,
      id,
    ]);
    return row as User[];
  }

  async delete(id: number) {
    const query = "DELETE FROM user WHERE id = ?";
    const [row] = await databaseClient.query<Rows>(query, [id]);
    return row as User[];
  }

  async patchName(fieldsToUpdate: User) {
    const query = "UPDATE user SET ? WHERE id = ?";
    const filterUndefined = (obj: User) => {
      return Object.fromEntries(
        Object.entries(obj).filter(
          ([key, value]) => value !== undefined && value !== "id",
        ),
      );
    };
    const [row] = await databaseClient.query<Rows>(query, [
      filterUndefined(fieldsToUpdate),
      fieldsToUpdate.id,
    ]);
    return row as User[];
  }
  async artVerification(userId: number, artId: number) {
    const query = `SELECT EXISTS (
    SELECT 1 
    FROM viewed_art_piece 
    WHERE user_id = ? AND art_piece_id = ?
) AS has_viewed`;

    const [row] = await databaseClient.query<Rows>(query, [userId, artId]);
    return row;
  }

  async addpoint(userId: number, artId: number) {
    const queryNewId = `INSERT INTO viewed_art_piece (user_id, art_piece_id)
VALUES (?, ?);`;
    const [resultId] = await databaseClient.query<Result>(queryNewId, [
      userId,
      artId,
    ]);
    if (resultId.affectedRows !== 0) {
      const queryAddPoints = `UPDATE user u
JOIN art_piece ap ON ap.id = ?
SET u.points = u.points + COALESCE(ap.points_value, 0)
WHERE u.id = ?`;
      const [result] = await databaseClient.query<Result>(queryAddPoints, [
        artId,
        userId,
      ]);
      return result.affectedRows;
    }
  }

  async deductPointsFromRecovery(artPieceId: string) {
    const query =
      "UPDATE user u JOIN viewed_art_piece v ON u.id = v.user_id JOIN art_piece a ON v.art_piece_id = a.id SET u.points = u.points - ROUND(a.points_value/3) WHERE a.id = ?";
    const [result] = await databaseClient.query<Result>(query, [artPieceId]);
    return result.affectedRows;
  }

  async addCreationPoints(userId: number, artPieceValue: number) {
    const query = "UPDATE user SET points = points + ? WHERE id = ?";
    const [result] = await databaseClient.query<Result>(query, [
      artPieceValue,
      userId,
    ]);
    return result.affectedRows;
  }
}
export default new UserRepository();
