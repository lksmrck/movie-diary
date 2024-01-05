import { useState } from "react";
import { Card, CardContent } from "@mui/material";
import AddMovieModal from "../components/addMovie/AddMovieModal";
import { Movie } from "../models/Movie";
import SearchMovie from "../components/searchMovie/SearchMovie";
import "../index.css";
import { Theme } from "../common/theme";

const AddMovie = () => {
  const [movieToAdd, setMovieToAdd] = useState({} as Movie);

  const [opened, setOpened] = useState(false);

  const handleOpenForm = (movie: any = {}) => {
    setOpened(true);
    setMovieToAdd(movie);
  };

  return (
    <div className="flex items-center flex-col gradient-bg   min-h-109 overflow-hidden">
      <div className="min-h-screenWithoutNavbar h-full">
        <Card
          sx={{
            padding: "5rem",
            marginTop: "2rem",
            height: "20rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: Theme.Color.grey_2,
            borderRadius: "10px",
          }}
          className="w-96 md:w-200"
        >
          <h4>
            <span className="text-black">FIND YOUR</span>{" "}
            <span className=" font-bold text-purple-900">M O V I E</span>
          </h4>
          <CardContent>
            <SearchMovie onClickSearchedMovie={handleOpenForm} />
          </CardContent>
        </Card>
        <AddMovieModal open={opened} handleClose={() => setOpened(false)} />
      </div>
    </div>
  );
};

export default AddMovie;
