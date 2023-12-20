import React, { useEffect } from "react";
import agent from "../../api/agent";
import useMoviesContext from "../../store/MoviesContext";
import MovieCard from "./MovieCard";
import useAuthContext from "../../store/AuthContext";
import useAppContext from "../../store/AppContext";
import { CircularProgress } from "@mui/material";
import "../../index.css";

const UserMovies = () => {
  const { userMovies, setUserMovies } = useMoviesContext();
  const { currentUser } = useAuthContext();
  const { isLoading, setIsLoading } = useAppContext();

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      setIsLoading(true);
      let res;
      if (currentUser?.id)
        res = await agent.Movies.getAll(currentUser?.id, {
          signal: controller.signal,
        });
      if (res?.isSuccess) setUserMovies(res.result);
      setIsLoading(false);
    };

    fetchMovies();

    return () => {
      controller.abort();
      setIsLoading(false);
    };
  }, []);

  return (
    <section className=" w-full h-full min-h-screenWithoutNavbar flex justify-center gradient-bg">
      <div className=" grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 p-2 gap-2  ">
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
