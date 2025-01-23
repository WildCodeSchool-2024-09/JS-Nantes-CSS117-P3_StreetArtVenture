import { type ReactNode, createContext, useContext, useState } from "react";
import type { User, Usertype } from "./UserContextType";

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
