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
}
export default new UserRepository();
