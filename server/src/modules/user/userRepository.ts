import { verify } from "node:crypto";
import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type User from "../user/userTypes";

class UserRepository {
  async read(id: number) {
    const [row] = await databaseClient.query<Rows>(
      "SELECT pseudo, firstname, lastname, email, zipcode, city, adress FROM user WHERE id = ?",
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

  async isUserYet(name: string, email: string): Promise<User[] | null> {
    const [rows] = await databaseClient.query<Rows>(
      "select email, pseudo from user where email = ? or pseudo = ?",
      [email, name],
    );

    return rows as User[];
  }

  async userInscription(
    pseudo: string,
    firstname: string,
    lastname: string,
    email: string,
    zipcode: string,
    adress: string,
    city: string,
    password: string,
  ): Promise<number | null> {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (pseudo, firstname, lastname, email, zipcode, city, adress, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [pseudo, firstname, lastname, email, zipcode, city, adress, password],
    );
    return result.insertId || null;
  }

  async update(id: number, data: User) {
    const query = `UPDATE user SET
    pseudo = ?,
    firstname = ?,
    lastname = ?,
    email = ?,
    adress = ?,
    zipcode = ?,
    city = ?
    WHERE id = ?`;
    const [row] = await databaseClient.query<Rows>(query, [
      data.pseudo,
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
}

export default new UserRepository();
