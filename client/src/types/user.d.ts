export interface User {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  email: string;
  zipcode: string;
  city: string;
  adress: string;
  password: string;
  points: number;
  is_admin: number;
  creation_date: string;
  last_connection: string;
  rank?: number;
}
