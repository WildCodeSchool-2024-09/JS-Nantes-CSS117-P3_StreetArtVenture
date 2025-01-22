import { createContext, type ReactNode, useContext, useState } from "react";

interface User {
  id: number;
  email: string;
  is_admin: number;
  is_ban: number;
  iat: number;
  exp: number;
}

interface Usertype {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<Usertype | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("err");
  }
  return context;
};
