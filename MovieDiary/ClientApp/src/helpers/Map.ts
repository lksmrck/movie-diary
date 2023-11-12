import { UserAdjustedSearchedMovie, Category, Profile } from "../models/Movie";

// from UserAdjustedSearchedMovie to Movie
const mapToMovie = (sm: UserAdjustedSearchedMovie, user: Profile) => {
  return {
    title: sm.title,
    description: sm.overview,
    category: "TBD",
    dateCreated: new Date(),
    dateWatched: sm.dateWatched,
    posterPath: sm.poster_path,
    user,
    rating: sm.rating,
    comment: sm.comment,
    categories: [
      {
        id: "0044a6d9-8411-40b2-aab4-191c23963d96",
        name: "Krimi",
      },
    ],
    // categories: sm.categories,
  };
};

const test = () => {
  console.log(process.env);
};

const Map = {
  mapToMovie,
  test,
};

export default Map;
