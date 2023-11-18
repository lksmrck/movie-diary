import { UserAdjustedSearchedMovie, Category, Profile } from "../models/Movie";

// from UserAdjustedSearchedMovie to Movie
const mapToMovie = (
  sm: UserAdjustedSearchedMovie,
  user: Profile,
  categories: string[]
) => {
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
    categories: categories.map((c) => ({ name: c })),
    // categories: sm.categories,
  };
};

const Map = {
  mapToMovie,
};

export default Map;
