export type Movie = {
  id: string;
  title: string;
  description: string;
  category: string;
  dateCreated: string;
  dateWatched: string;
  user: Profile;
  rating: Rating;
  comment: Comment;
  categories: Category[];
};

export type Profile = {
  id: string;
  name: string;
};

export type Rating = {
  //id: string;
  value: number;
};
export type Comment = {
  //id: string;
  text: string;
};

export type Category = {
  id: string;
  name: string;
};
