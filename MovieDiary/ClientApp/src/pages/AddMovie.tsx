import { useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddMovieModal from "../components/addMovie/AddMovieModal";
import { Movie } from "../models/Movie";
import SearchMovie from "../components/searchMovie/SearchMovie";
import "../index.css";
import { Theme } from "../common/theme";

const AddMovie = () => {
  const [movieToAdd, setMovieToAdd] = useState({} as Movie);

  const width = 50;

  const [opened, setOpened] = useState(false);

  const handleOpenForm = (movie: any = {}) => {
    setOpened(true);
    setMovieToAdd(movie);
  };

  return (
    <div className="flex items-center flex-col gradient-bg  h-screenWithoutNavbar  overflow-hidden">
      <Card
        sx={{
          padding: "5rem",
          marginTop: "2rem",
          width: `${width}rem`,
          height: "20rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: Theme.Color.grey_2,
          borderRadius: "10px",
        }}
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
      <Accordion
        sx={{
          maxWidth: `${width - 4}rem`,
          marginTop: "3rem",
          backgroundColor: Theme.Color.grey_2,
        }}
      >
        <AccordionSummary
          id="how-does-it-work"
          aria-controls="how-does-it-work"
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>How does it work?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AddMovie;
