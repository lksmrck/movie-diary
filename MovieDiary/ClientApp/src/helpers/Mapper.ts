import {
  UserAdjustedSearchedMovie,
  Category,
  Profile,
  Movie,
} from "../models/Movie";

// from UserAdjustedSearchedMovie to Movie
const mapToMovie = (sm: UserAdjustedSearchedMovie, user: Profile): Movie => {
  return {
    title: sm.title,
    description: sm.overview,
    dateCreated: new Date(),
    dateWatched: sm.dateWatched,
    posterPath: sm.poster_path,
    user,
    rating: sm.rating,
    comment: sm.comment,
    defaultCategories: sm.defaultCategories,
    userCategories: sm.userCategories as Category[],
  };
};

const Mapper = {
  mapToMovie,
};

export default Mapper;
