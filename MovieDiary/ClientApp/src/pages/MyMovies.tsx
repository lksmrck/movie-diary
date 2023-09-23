import React from "react";
import MovieCard from "../components/myMovies/MovieCard";

const MyMovies = () => {
  return (
    <div className=" grid grid-cols-4 p-5">
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
    </div>
  );
};

export default MyMovies;
