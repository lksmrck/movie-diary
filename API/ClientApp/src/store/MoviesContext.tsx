import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  FC,
  useContext,
} from "react";
import { Movie, UserAdjustedSearchedMovie } from "../models/Movie";

interface MoviesContextInterface {
  selectedMovie: UserAdjustedSearchedMovie;
  setSelectedMovie: Dispatch<SetStateAction<UserAdjustedSearchedMovie>>;
  userMovies: Movie[];
  setUserMovies: Dispatch<SetStateAction<Movie[]>>;
}

const MoviesContext = createContext({} as MoviesContextInterface);

export const MoviesContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState(
    {} as UserAdjustedSearchedMovie
  );
  const [userMovies, setUserMovies] = useState([] as Movie[]);

  return (
    <MoviesContext.Provider
      value={{
        selectedMovie,
        setSelectedMovie,
        userMovies,
        setUserMovies,
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
