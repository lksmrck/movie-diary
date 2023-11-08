import { getLocalStorage } from "../utils/getLocalStorage";
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
import {
  Movie,
  SearchedMovie,
  UserAdjustedSearchedMovie,
} from "../models/Movie";

interface MoviesContextInterface {
  selectedMovie: UserAdjustedSearchedMovie;
  setSelectedMovie: Dispatch<SetStateAction<UserAdjustedSearchedMovie>>;
}

const MoviesContext = createContext({} as MoviesContextInterface);

export const MoviesContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState(
    {} as UserAdjustedSearchedMovie
  );

  return (
    <MoviesContext.Provider
      value={{
        selectedMovie,
        setSelectedMovie,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

const useMoviesContext = () => {
  return useContext(MoviesContext);
};

export default useMoviesContext;
