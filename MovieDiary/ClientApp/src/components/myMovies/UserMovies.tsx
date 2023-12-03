import React, { useEffect } from "react";
import agent from "../../api/agent";
import useMoviesContext from "../../store/MoviesContext";
import MovieCard from "./MovieCard";
import useAuthContext from "../../store/AuthContext";
import useAppContext from "../../store/AppContext";
import { CircularProgress } from "@mui/material";

const UserMovies = () => {
  const { userMovies, setUserMovies } = useMoviesContext();
  const { currentUser } = useAuthContext();
  const { isLoading, setIsLoading } = useAppContext();

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      setIsLoading(true);
      let movies;
      if (currentUser?.id)
        movies = await agent.Movies.getAll(currentUser?.id, {
          signal: controller.signal,
        });
      if (movies) setUserMovies(movies);
      setIsLoading(false);
    };

    fetchMovies();

    return () => {
      controller.abort();
      setIsLoading(false);
    };
  }, []);

  return (
    <section className=" w-full h-full flex justify-center ">
      <div className=" grid grid-cols-4 p-2 gap-2  ">
        {isLoading ? (
          <CircularProgress color="inherit" />
        ) : (
          userMovies.map((m) => <MovieCard movie={m} />)
        )}
      </div>
    </section>
  );
};

export default UserMovies;
