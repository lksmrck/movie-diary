import React, { ChangeEvent, useState } from "react";
import Input from "../components/Input";
import { Theme } from "../common/theme";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "../components/Button";
import AddMovieModal from "../components/addMovie/AddMovieModal";
import agent from "../api/agent";
import SearchMovieCard from "../components/searchMovie/SearchMovieCard";

const AddMovie = () => {
  const width = 50;

  const [opened, setOpened] = useState(false);

  const handleClick = () => setOpened(true);

  return (
    <div className="flex justify-center items-center flex-col">
      <Card
        sx={{ padding: "5rem", marginTop: "2rem", maxWidth: `${width}rem` }}
      >
        <Typography variant="h4">Find your movie!</Typography>
        <CardContent>
          {/* <Input
            name="search"
            label="Movie"
            color={Theme.Color.primary}
            value={searchTerm}
            onChange={handleChangeSearchTerm}
          /> */}
          <SearchMovieCard />
        </CardContent>
        {/* <CardActions>
       
        </CardActions> */}
      </Card>
      <Button
        variant="contained"
        handleClick={handleClick}
        text="Otevřít form"
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
