export type User = {
  id: number;
  email: string;
  is_admin: number;
  is_ban: number;
  iat: number;
  exp: number;
};

export type Usertype = {
  user: User | null;
  setUser: (user: User | null) => void;
};
export type Usernav = {
  user: User | null;
};
