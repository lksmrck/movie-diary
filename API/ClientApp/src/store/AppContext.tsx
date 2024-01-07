import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  FC,
  useContext,
} from "react";

interface AppContextInterface {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  error: { isError: boolean; message: string };
  setError: Dispatch<SetStateAction<{ isError: boolean; message: string }>>;
}

const AppContext = createContext({} as AppContextInterface);

export const AppContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, message: "" });

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        error,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
