import { getLocalStorage, getSessionStorage } from "../utils/getLocalStorage";
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
import { toast } from "react-toastify";

interface AuthContextInterface {
  currentUser: UserInLS | null;
  setCurrentUser: Dispatch<SetStateAction<UserInLS | null>>;
  loginUser: (user: any) => void;
  logoutUser: () => void;
  isLoading: boolean;
}

const AuthContext = createContext({} as AuthContextInterface);

export const AuthContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  // const { setError } = useAppContext();
  //Stored data for user and company
  const [currentUser, setCurrentUser] = useState(
    // getSessionStorage("user") || null
    getLocalStorage("user") || null
  );
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (formData: any) => {
    setIsLoading(true);
    const res = await agent.Users.login(formData);
    if (res?.isSuccess) setCurrentUser(res?.result);
    if (res?.isSuccess) toast.error(res?.errorMessage);
    setIsLoading(false);
    router.navigate("/home");
  };

  const logoutUser = () => {
    setCurrentUser(null);
    router.navigate("/");
  };

  useEffect(() => {
    // sessionStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loginUser,
        logoutUser,
        isLoading,
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
