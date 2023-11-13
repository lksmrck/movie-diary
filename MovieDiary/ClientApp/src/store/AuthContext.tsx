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
  useContext,
} from "react";

interface AuthContextInterface {
  currentUser: UserInLS | null;
  setCurrentUser: Dispatch<SetStateAction<UserInLS | null>>;
}

const AuthContext = createContext({} as AuthContextInterface);

export const AuthContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  //Stored data for user and company
  const [currentUser, setCurrentUser] = useState(
    getLocalStorage("user") || null
  );

  useEffect(() => {
    localStorage.setItem(
      "user",
      JSON.stringify({ ...currentUser, date: new Date() })
    );
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
