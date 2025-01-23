import { verify } from "node:crypto";
import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  email: string;
  zipcode: number;
  adress: string;
  city: string;
  password: string;
  points: number;
  is_admin: boolean;
  is_ban: boolean;
  creation_date: Date;
  last_connection: Date;
};

class UserRepository {
  async read(id: number) {
    const [row] = await databaseClient.query<Rows>(
      "SELECT name, firstname, lastname, email, zipcode, city, adress FROM user WHERE id = ?",
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
      "select id, is_admin, is_ban, email from user where email = ? and password = ?",
      [email, password],
    );
    if (rows.length === 0) {
      return null;
    }
    return rows as User[];
  }

  async update(id: number, data: User) {
    const query = `UPDATE user SET
    name = ?,
    firstname = ?,
    lastname = ?,
    email = ?,
    adress = ?,
    zipcode = ?,
    city = ?
    WHERE id = ?`;
    const [row] = await databaseClient.query<Rows>(query, [
      data.name,
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
