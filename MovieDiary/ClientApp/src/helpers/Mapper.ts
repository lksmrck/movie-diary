import {
  UserAdjustedSearchedMovie,
  Category,
  Profile,
  Movie,
} from "../models/Movie";

// from UserAdjustedSearchedMovie to Movie
const mapToMovie = (
  sm: UserAdjustedSearchedMovie,
  user: Profile
  // defaultCategories: string[]
): Movie => {
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
    defaultCategories: sm.defaultCategories,
    userCategories: sm.userCategories as Category[],
    // categories: sm.categories,
  };
};

const Mapper = {
  mapToMovie,
};

export default Mapper;
