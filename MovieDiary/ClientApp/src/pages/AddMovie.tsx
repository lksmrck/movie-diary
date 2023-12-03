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
import Button from "../components/Button";
import AddMovieModal from "../components/addMovie/AddMovieModal";
import agent from "../api/agent";
import SearchMovie from "../components/searchMovie/SearchMovie";
import { Movie } from "../models/Movie";
import SearchMovieWorking from "../components/searchMovie/SearchMovieWorking";
import Map from "../helpers/Mapper";

const AddMovie = () => {
  const [movieToAdd, setMovieToAdd] = useState({} as Movie);

  const width = 50;

  const [opened, setOpened] = useState(false);

  const handleOpenForm = (movie: any = {}) => {
    setOpened(true);
    setMovieToAdd(movie);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <Card
        sx={{
          padding: "5rem",
          marginTop: "2rem",
          width: `${width}rem`,
          height: "20rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Find your movie!</Typography>
        <CardContent>
          {/* <SearchMovie onClickSearchedMovie={handleOpenForm} /> */}
          <SearchMovieWorking onClickSearchedMovie={handleOpenForm} />
        </CardContent>
      </Card>
      <Button
        variant="contained"
        handleClick={handleOpenForm}
        text="Otevřít form"
        color="primary"
      />
      <AddMovieModal open={opened} handleClose={() => setOpened(false)} />
      <Accordion sx={{ maxWidth: `${width - 4}rem`, marginTop: "3rem" }}>
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
