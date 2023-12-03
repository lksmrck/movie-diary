import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";

import Input from "../Input";
import { Theme } from "../../common/theme";
import Rating from "../Rating";
import agent from "../../api/agent";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Accordion from "../Accordion";
import useMoviesContext from "../../store/MoviesContext";
import Button from "../Button";
import Mapper from "../../helpers/Mapper";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { SearchedMovie } from "../../models/Movie";
import useAuthContext from "../../store/AuthContext";
import { useState } from "react";
import AddCategoryPopover from "./AddCategoryPopover";

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
  border: `2px solid ${Theme.Color.teal_2}`,
  borderRadius: Theme.BorderRadius.S,
  boxShadow: 24,
  p: 4,
};

const AddMovieModal = ({ open, handleClose }: Props) => {
  const { selectedMovie, setSelectedMovie } = useMoviesContext();
  const { currentUser } = useAuthContext();
  const { comment, rating } = selectedMovie;
  const [addCategoryOpened, setAddCategoryOpened] = useState(false);

  const [categories, setCategories] = useState([] as any);

  const handleChange = (
    type: string,
    value: string | number,
    subtype?: string
  ) => {
    // if (subtype) setFormValues((prev) => {
    //   return {...prev, prev[type]: {...prev[type], prev[type][subtype]: value}}
    // })
    if ((type = "categories")) {
      if (value == "-- Create new --") {
        setAddCategoryOpened(true);
      } else setCategories(value);
    }
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

  const saveMovie = async () => {
    const categories = await agent.Search.categories(selectedMovie.genre_ids);

    const mov = Mapper.mapToMovie(
      selectedMovie,
      {
        id: currentUser?.id,
        name: currentUser?.name,
      },
      categories
    );

    await agent.Movies.create(mov);

    handleClose();
  };

  const dummy_categories_list = [
    { id: "0", name: "-- Create new --" },
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
          heading="Date watched"
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedMovie.dateWatched}
              onChange={(d) =>
                setSelectedMovie({ ...selectedMovie, dateWatched: d })
              }
            />
          </LocalizationProvider>
        </Accordion>
        <Accordion
          sx={{ marginTop: "1rem" }}
          id="add-comment"
          heading="Add comment"
        >
          <Input
            name="comment"
            label="Comment"
            multiline
            color={Theme.Color.teal_2}
            value={comment?.text}
            onChange={(e) =>
              handleChange(e.target.name, e.target.value, "text")
            }
            rows={10}
            sx={{ width: "18.5rem" }}
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
          heading="Add your own categories"
        >
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="category-lbl">Categories</InputLabel>
            <AddCategoryPopover
              open={addCategoryOpened}
              onClose={() => setAddCategoryOpened(false)}
            />
            <Select
              labelId="category-lbl"
              name="categories"
              multiple
              value={categories}
              onChange={(e: any) => {
                console.log("VAL", e.target);
                handleChange(e.target.name, e.target.value, undefined);
              }}
              input={
                <OutlinedInput id="select-multiple-chip" label="Categories" />
              }
              renderValue={(selected: any) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value: any) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {dummy_categories_list?.map((cat) => (
                <MenuItem key={cat.name} value={cat.name}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Accordion>

        {/* toto bude user specific category */}

        <Button
          handleClick={saveMovie}
          text="Save"
          variant="outlined"
          color="secondary"
          sx={{ marginTop: "2rem" }}
        />
      </Box>
    </Modal>
  );
};

export default AddMovieModal;
