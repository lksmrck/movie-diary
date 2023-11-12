import { useState } from "react";
import { Theme } from "../../common/theme";
import agent from "../../api/agent";
import { useTypingDebounce } from "../../hooks/hooks";
import SearchedMovieCard from "./SearchedMovieCard";
import Input from "../Input";
import useMoviesContext from "../../store/MoviesContext";

type Props = {
  onClickSearchedMovie: (movie: any) => void;
};

const SearchMovieWorking = ({ onClickSearchedMovie }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [options, setOptions] = useState([] as any);
  const { setSelectedMovie } = useMoviesContext();

  const fetchMovies = async () => {
    const movies = await agent.Search.movie(searchTerm);
    setOptions(movies);
  };

  const { debouncedSearchTerm, setDebouncedSearchTerm } = useTypingDebounce(
    fetchMovies,
    1000
  );

  const handleChangeSearchTerm = (value: string) => {
    setSearchTerm(value);
    clearTimeout(debouncedSearchTerm);
    setDebouncedSearchTerm(setTimeout(() => value, 1000));
  };

  const handleSelectMovie = (movie: any) => {
    console.log("movie", movie);
    setSelectedMovie({ ...movie, categories: [] });
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
      />
      {options.map((o: any) => (
        <SearchedMovieCard data={o} onSelectMovie={handleSelectMovie} />
      ))}
    </>
  );
};

export default SearchMovieWorking;
