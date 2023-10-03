import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Theme } from "../../common/theme";
import agent from "../../api/agent";
import { useTypingDebounce } from "../../hooks/hooks";

const SearchMovieCard = () => {
  const [selectedMovie, setSelectedMovie] = useState(
    {} as {
      poster_path: string;
      title: string;
      release_date: string;
      highlight: boolean;
      vote_average: number;
      overview: string;
      backdrop_path: string;
    }
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [options, setOptions] = useState([] as any);

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

  return (
    <Autocomplete
      id="search-movie"
      sx={{ width: 500 }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.title
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={selectedMovie}
      noOptionsText="Start typing to search for a movie"
      onChange={(e: any) => {
        // setOptions(newValue ? [newValue, ...options] : options);
        setSelectedMovie(e.target.value);
      }}
      onInputChange={(event, newInputValue) => {
        handleChangeSearchTerm(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search movie"
          fullWidth
          sx={{
            "&:before": {
              borderColor: Theme.Color.primary,
            },
            "&:after": {
              borderColor: Theme.Color.primary,
            },
          }}
        />
      )}
      renderOption={(props, option) => {
        const matches = [] as any;
        // console.log(option);
        // const parts = parse(
        //   option.name,
        //   matches.map((match: any) => [
        //     match.offset,
        //     match.offset + match.length,
        //   ])
        // );
        return (
          <li>
            <Grid
              container
              alignItems="center"
              sx={{ height: "5rem", borderBottom: "1px solid grey" }}
            >
              <Grid item sx={{ display: "flex", width: 44 }}>
                <Box
                  component="img"
                  sx={{
                    height: "5rem",
                    objectFit: "cover",
                  }}
                  alt="movie-poster"
                  src={
                    process.env.REACT_APP_MOVIES_IMG_API + option.poster_path
                  }
                />
              </Grid>
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                {/* {options.map((o, index) => ( */}
                <Box
                  key={option.title}
                  component="span"
                  sx={{ fontWeight: option.highlight ? "bold" : "regular" }}
                >
                  {option.title}
                </Box>
                {/* ))} */}
                <Typography variant="body2" color="text.secondary">
                  {option.release_date}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};

export default SearchMovieCard;
