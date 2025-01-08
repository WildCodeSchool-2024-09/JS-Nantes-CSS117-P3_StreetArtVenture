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
  creation_date: Date;
  last_connection: Date;
};

class UserRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from user");
    return rows as User[];
  }

  async verifyUser(email: string, password: string): Promise<User[] | null> {
    const [rows] = await databaseClient.query<Rows>(
      "select id, is_admin, email from user where email = ? and password = ?",
      [email, password],
    );
    if (rows.length === 0) {
      return null;
    }
    return rows as User[];
  }

  async isUserYet(name: string, email: string): Promise<User[] | null> {
    const [rows] = await databaseClient.query<Rows>(
      "select email, name from user where email = ? or name = ?",
      [name, email],
    );
    if (rows.length !== 0) {
      return null;
    }
    return rows as User[];
  }

  async userInscription(
    name: string,
    firstname: string,
    lastname: string,
    email: string,
    zipcode: number,
    adress: string,
    city: string,
    password: string,
  ): Promise<number | null> {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (name, firstname, lastname, email, zipcode, city, adress, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, firstname, lastname, email, zipcode, city, adress, password],
    );
    return result.insertId || null;
  }
}
export default new UserRepository();
