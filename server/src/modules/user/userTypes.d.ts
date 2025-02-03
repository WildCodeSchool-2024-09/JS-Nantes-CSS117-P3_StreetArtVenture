type User = {
  id: number;
  pseudo: string;
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

export default User;
