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
  console.log(sm);
  return {
    title: sm.title,
    description: sm.overview,
    // User specific categories
    dateCreated: new Date(),
    dateWatched: sm.dateWatched,
    posterPath: sm.poster_path,
    user,
    rating: sm.rating,
    comment: sm.comment,
    defaultCategories: ["TBD", "TBD"],
    userCategories: categories.map((c) => ({ name: c })),
    // categories: sm.categories,
  };
};

const Mapper = {
  mapToMovie,
};

export default Mapper;
