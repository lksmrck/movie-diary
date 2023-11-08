import React from "react";

type Props = {
  data: any;
  onSelectMovie: (movie: any) => void;
};

const SearchedMovieCard = ({ data, onSelectMovie }: Props) => {
  return (
    <div
      className="flex w-72 border cursor-pointer"
      onClick={() => onSelectMovie(data)}
    >
      <img
        src={process.env.REACT_APP_MOVIES_IMG_API + data.poster_path}
        width="40px"
      />
      <div>
        <h2>{data.title}</h2>
        <h4>{data.release_date}</h4>
      </div>
    </div>
  );
};

export default SearchedMovieCard;
