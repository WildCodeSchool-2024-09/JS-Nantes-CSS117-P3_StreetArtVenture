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
  isAdmin: boolean;
  isBanned: boolean;
  creation_date: Date;
  last_connection: Date;
};

export default User;
