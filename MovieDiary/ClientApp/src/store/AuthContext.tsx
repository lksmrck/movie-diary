import { getLocalStorage } from "../utils/getLocalStorage";
import { UserInLS } from "../models/UserInLS";
import { router } from "../routes";
import agent from "../api/agent";
import useAppContext from "./AppContext";
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
  loginUser: (user: any) => void;
  logoutUser: () => void;
}

const AuthContext = createContext({} as AuthContextInterface);

export const AuthContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { setError } = useAppContext();
  //Stored data for user and company
  const [currentUser, setCurrentUser] = useState(
    getLocalStorage("user") || null
  );

  const loginUser = async (formData: any) => {
    try {
      const res = await agent.Users.login(formData);
      if (res.isSuccess) setCurrentUser(res.result);
      // startRefreshTokenTimer(res.result);
      router.navigate("/home");
    } catch (error: any) {
      setError({ isError: true, message: "Error during login." });
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    router.navigate("/");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loginUser,
        logoutUser,
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
