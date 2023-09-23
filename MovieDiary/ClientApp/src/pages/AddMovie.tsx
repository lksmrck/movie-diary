import React from "react";
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

const AddMovie = () => {
  const width = 30;

  return (
    <div className="flex justify-center items-center flex-col">
      <Card
        sx={{ padding: "5rem", marginTop: "2rem", maxWidth: `${width}rem` }}
      >
        <Typography variant="h4">Find your movie!</Typography>
        <CardContent>
          <Input label="Movie" color={Theme.color.primary} />
        </CardContent>
        {/* <CardActions>
       
        </CardActions> */}
      </Card>
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
