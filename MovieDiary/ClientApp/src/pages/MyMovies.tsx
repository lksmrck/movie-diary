import React, { useEffect, useState } from "react";
import MovieCard from "../components/myMovies/MovieCard";
import agent from "../api/agent";
import UserMovies from "../components/myMovies/UserMovies";

const MyMovies = () => {
  const [myMovies, setMyMovies] = useState([] as any);

  // const fetchMyMovies = async () => {
  //   const movies = await agent.Movies.getAll(
  //     "cb3f428a-2f9a-43c1-c7f3-08dbbc45eab2"
  //   );

  //   console.log(movies);
  //   setMyMovies(movies);
  // };

  // useEffect(() => {
  //   fetchMyMovies();
  // }, []);

  return (
    <div className="w-screen">
      {/* {myMovies.map((m: any) => (
        <MovieCard title={m.title} description={m.description} />
      ))} */}
      <UserMovies />
    </div>
  );
};

export default MyMovies;
