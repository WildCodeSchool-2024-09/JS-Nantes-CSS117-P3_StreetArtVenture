export interface User {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  zipcode: string;
  city: string;
  adress: string;
  password: string;
  points: number;
  isAdmin: number;
  creation_date: string;
  last_connection: string;
  rank?: number;
}

export interface UserProfileData {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  zipcode: string;
  city: string;
  adress: string;
}
