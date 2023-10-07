import React, { useEffect, useState } from "react";
import MovieCard from "../components/myMovies/MovieCard";
import agent from "../api/agent";

const MyMovies = () => {
  const [myMovies, setMyMovies] = useState([] as any);

  const fetchMyMovies = async () => {
    const movies = await agent.Movies.getAll(
      "cb3f428a-2f9a-43c1-c7f3-08dbbc45eab2"
    );

    console.log(movies);
    setMyMovies(movies);
  };

  useEffect(() => {
    fetchMyMovies();
  }, []);

  return (
    <div className=" grid grid-cols-4 p-5">
      {myMovies.map((m: any) => (
        <MovieCard title={m.title} description={m.description} />
      ))}
    </div>
  );
};

export default MyMovies;
