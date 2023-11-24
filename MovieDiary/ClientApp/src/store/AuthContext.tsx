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
  // setCurrentUser: Dispatch<SetStateAction<UserInLS | null>>;
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
  const [refreshTokenTimeout, setRefreshTokenTimeout] = useState(null as any);

  const loginUser = async (formData: any) => {
    try {
      const res = await agent.Users.login(formData);
      if (res.isSuccess) setCurrentUser(res.result);
      startRefreshTokenTimer(res.result);
      router.navigate("/home");
    } catch (error: any) {
      setError({ isError: true, message: "Error during login." });
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    router.navigate("/");
  };

  const refreshToken = async () => {
    stopRefreshTokenTimer();
    try {
      const user = await agent.Users.refreshToken();
      setCurrentUser(user);
      startRefreshTokenTimer(user);
    } catch (error: any) {
      setError({ isError: true, message: "Error during refreshing token." });
    }
  };

  const startRefreshTokenTimer = (user: any) => {
    const jwtToken = JSON.parse(atob(user.token.split(".")[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 30 * 1000;
    console.log("Timeout pro refresh tokenu je:", timeout);
    setRefreshTokenTimeout(setTimeout(refreshToken, timeout));
  };
  const stopRefreshTokenTimer = () => {
    clearTimeout(refreshTokenTimeout);
  };

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
