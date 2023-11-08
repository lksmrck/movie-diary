import { Box, Chip, MenuItem, Modal, Typography } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useState } from "react";
import Input from "../Input";
import { Theme } from "../../common/theme";
import Rating from "../Rating";
import { Movie } from "../../models/Movie";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import Accordion from "../Accordion";
import useMoviesContext from "../../store/MoviesContext";
import Button from "../Button";

type Props = {
  open: boolean;
  handleClose: () => void;
  //handleChange: () => void
};

const style = {
  position: "absolute" as "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddMovieModal = ({ open, handleClose }: Props) => {
  const { selectedMovie, setSelectedMovie } = useMoviesContext();
  const { comment, rating, categories } = selectedMovie;

  console.log(categories);
  const cat = [] as any;
  const handleChange = (
    type: string,
    value: string | number,
    subtype?: string
  ) => {
    // if (subtype) setFormValues((prev) => {
    //   return {...prev, prev[type]: {...prev[type], prev[type][subtype]: value}}
    // })

    if (subtype) {
      setSelectedMovie((prev: any) => ({
        ...prev,
        [type]: {
          ...prev[type],
          [subtype]: value,
        },
      }));
    }

    if (!subtype) {
      console.log("VAL", value);
      setSelectedMovie((prev: any) => ({
        ...prev,
        [type]: typeof value === "string" ? value.split(",") : value,
      }));
    }
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 18 * 4.5 + 9,
        width: 250,
      },
    },
  };

  const saveMovie = () => {
    console.log("Ukládám movie: ", selectedMovie);
  };

  const dummy_categories_list = [
    {
      id: "0044a6d9-8411-40b2-aab4-191c23963d96",
      name: "Krimi",
    },
    {
      id: "97942583-f375-401c-84b0-f3ebc6548d0d",
      name: "Komedie",
    },
  ];

  const dummy_list = ["Krimi", "Komedie"];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="title" variant="h6" component="h2">
          Save your personal information about the movie.
        </Typography>
        <Typography id="description" sx={{ mt: 2 }}>
          Below you can add your own comment, rating or assign the movie to you
          own categories.
        </Typography>
        <Accordion
          sx={{ marginTop: "1rem" }}
          id="add-comment"
          heading="Add comment"
        >
          <Input
            name="comment"
            label="Comment"
            color={Theme.Color.primary}
            value={comment?.text}
            onChange={(e) =>
              handleChange(e.target.name, e.target.value, "text")
            }
          />
        </Accordion>
        <Accordion
          sx={{ marginTop: "1rem" }}
          id="add-rating"
          heading="Add rating"
        >
          <Rating
            name="rating"
            value={rating?.value}
            onChange={(e) =>
              handleChange(e.target.name, e.target.value, "value")
            }
          />
        </Accordion>
        <Accordion
          sx={{ marginTop: "1rem" }}
          id="add-categories"
          heading="Add categories"
        >
          <Select
            name="categories"
            multiple
            value={categories}
            onChange={(e: any) => {
              console.log(e.target.value);
              handleChange(e.target.name, e.target.value, undefined);
            }}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected: any) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value: any) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {dummy_list?.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </Accordion>

        {/* toto bude user specific category */}

        {/* <Input name="comment" label="Comment" color={Theme.color.primary} value={} /> */}
        <Button handleClick={saveMovie} text="Uložit" variant="outlined" />
      </Box>
    </Modal>
  );
};

export default AddMovieModal;
