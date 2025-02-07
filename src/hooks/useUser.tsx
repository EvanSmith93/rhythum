import { createContext, useContext } from "react";
import { User } from "../utils/types";

type UserContextProps = {
  user: User | null;
  refreshUser: () => Promise<void>;
};

export const UserContext = createContext<UserContextProps>({
  user: null,
  refreshUser: async () => {},
});

export const useUser = () => useContext(UserContext);
