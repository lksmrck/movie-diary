import React, { useEffect } from "react";
import agent from "../../api/agent";
import useMoviesContext from "../../store/MoviesContext";
import MovieCard from "./MovieCard";
import useAuthContext from "../../store/AuthContext";

const UserMovies = () => {
  const { userMovies, setUserMovies } = useMoviesContext();
  const { currentUser } = useAuthContext();

  const fetchMovies = async () => {
    let movies;
    if (currentUser?.id) movies = await agent.Movies.getAll(currentUser?.id);
    if (movies) setUserMovies(movies);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className=" w-full h-full grid grid-cols-4 p-5">
      {userMovies.map((m) => (
        <MovieCard movie={m} />
      ))}
    </div>
  );
};

export default UserMovies;
