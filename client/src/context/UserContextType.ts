export type User = {
  id: number;
  email: string;
  isAdmin: number;
  is_ban: number;
  iat: number;
  exp: number;
};

export type Usertype = {
  user: User | null;
  setUser: (user: User | null) => void;
};
