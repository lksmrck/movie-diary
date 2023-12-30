export type Movie = {
  id?: string;
  title: string;
  description: string;
  dateCreated: Date;
  dateWatched: string;
  posterPath: string;
  user: Profile;
  rating: Rating;
  comment: Comment;
  // categories: Category[] | string[];
  defaultCategories: string[];
  userCategories: Category[];
};

export type SearchedMovie = {
  poster_path: string;
  title: string;
  release_date: string;
  // highlight: boolean;
  vote_average: number;
  overview: string;
  backdrop_path: string;
  genre_ids: number[];
};

export interface UserAdjustedSearchedMovie extends SearchedMovie {
  rating: { value: number };
  comment: { text: string };
  userCategories: Category[] | string[]; //pri vyberu kategorii string[], pak se preklopi do Category[]
  defaultCategories: string[];
  dateWatched: any;
}

export type Profile = {
  id?: string;
  name?: string;
};

export type Rating = {
  //id: string;
  value: number;
};
export type Comment = {
  id?: string;
  text: string;
};

export type Category = {
  id?: string;
  name: string;
};
