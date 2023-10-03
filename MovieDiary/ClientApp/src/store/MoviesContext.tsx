import { getLocalStorage } from "../utils/getLocalStorage";
import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  FC,
} from "react";
import { Movie } from "../models/Movie";

interface MoviesContextInterface {
  movies: Movie[];
}

const MoviesContext = createContext({} as MoviesContextInterface);

export const ReservationContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [movies, setMovies] = useState([] as Movie[]);

  return (
    <MoviesContext.Provider
      value={{
        movies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
export default MoviesContext;
