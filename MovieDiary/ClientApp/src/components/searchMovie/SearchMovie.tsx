import { useState } from "react";
import { Theme } from "../../common/theme";
import agent from "../../api/agent";
import { useTypingDebounce } from "../../hooks/hooks";
import FoundMovies from "./FoundMovies";
import Input from "../Input";
import useMoviesContext from "../../store/MoviesContext";
import { List } from "@mui/material";
import LinearProgress from "../LinearProgress";

type Props = {
  onClickSearchedMovie: (movie: any) => void;
};

const SearchMovie = ({ onClickSearchedMovie }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [options, setOptions] = useState([] as any);
  const { setSelectedMovie } = useMoviesContext();
  // const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    // setIsLoading(true);
    const movies = await agent.Search.movie(searchTerm);
    setOptions(movies);
    // setIsLoading(false);
  };

  const { debouncedSearchTerm, setDebouncedSearchTerm, isLoading } =
    useTypingDebounce(fetchMovies, 1000);
  console.log(isLoading);
  const handleChangeSearchTerm = (value: string) => {
    setSearchTerm(value);
    clearTimeout(debouncedSearchTerm);
    setDebouncedSearchTerm(setTimeout(() => value, 1000));
  };

  const handleSelectMovie = (movie: any) => {
    setSelectedMovie({ ...movie, userCategories: [] });
    onClickSearchedMovie(movie);
  };

  return (
    <>
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeSearchTerm(e.target.value)
        }
        color={Theme.Color.teal_2}
        value={searchTerm}
        label="Find your movie"
        name="find-your-movie"
        sx={{ position: "relative", width: "360px" }}
      />
      {isLoading && <LinearProgress />}
      {!isLoading && options.length > 0 && (
        <FoundMovies
          items={options}
          onSelectMovie={handleSelectMovie}
          onClose={() => setOptions([])}
        />
      )}
    </>
  );
};

export default SearchMovie;
