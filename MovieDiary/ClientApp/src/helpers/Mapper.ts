import {
  UserAdjustedSearchedMovie,
  Category,
  Profile,
  Movie,
} from "../models/Movie";

// from UserAdjustedSearchedMovie to Movie
const mapToMovie = (
  sm: UserAdjustedSearchedMovie,
  user: Profile,
  categories: string[]
): Movie => {
  return {
    title: sm.title,
    description: sm.overview,
    // User specific categories
    category: "TBD",
    dateCreated: new Date(),
    dateWatched: sm.dateWatched,
    posterPath: sm.poster_path,
    user,
    rating: sm.rating,
    comment: sm.comment,
    // Categories z TMDB
    categories: categories.map((c) => ({ name: c })),
    // categories: sm.categories,
  };
};

const Mapper = {
  mapToMovie,
};

export default Mapper;
