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

interface AppContextInterface {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext({} as AppContextInterface);

export const AuthContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
