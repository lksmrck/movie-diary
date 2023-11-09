import { UserAdjustedSearchedMovie, Category, Profile } from "../models/Movie";

const mapToMovie = (sm: UserAdjustedSearchedMovie, user: Profile) => {
  return {
    title: sm.title,
    description: sm.overview,
    category: "TBD",
    dateCreated: new Date().toString(),
    dateWatched: sm.dateWatched,
    user,
    rating: sm.rating,
    comment: sm.comment,
    categories: sm.categories,
  };
};

const Map = {
  mapToMovie,
};

export default Map;
