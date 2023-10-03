import { getLocalStorage } from "../utils/getLocalStorage";
import { UserInLS } from "../models/UserInLS";
import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  FC,
} from "react";

interface AuthContextInterface {
  user: UserInLS | null;
  setUser: Dispatch<SetStateAction<UserInLS | null>>;
}

const AuthContext = createContext({} as AuthContextInterface);

export const AuthContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  //Stored data for user and company
  const [user, setUser] = useState(getLocalStorage("user") || null);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
