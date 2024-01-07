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
import Select from "@mui/material/Select";
import Accordion from "../Accordion";
import useMoviesContext from "../../store/MoviesContext";
import Button from "../Button";
import Mapper from "../../helpers/Mapper";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Category } from "../../models/Movie";
import useAuthContext from "../../store/AuthContext";
import { useState, useRef } from "react";
import AddCategoryPopover from "./AddCategoryPopover";
import useAppContext from "../../store/AppContext";
import { useUserCategories } from "../../hooks/hooks";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const style = {
  position: "absolute" as "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  "&::-webkit-scrollbar": { width: 0 },
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  maxHeight: "80vh",
  overflowY: "auto",
};

const AddMovieModal = ({ open, handleClose }: Props) => {
  const { selectedMovie, setSelectedMovie } = useMoviesContext();
  const { currentUser } = useAuthContext();
  const { isLoading, setIsLoading } = useAppContext();
  const { comment, rating } = selectedMovie;
  const [addCategoryOpened, setAddCategoryOpened] = useState<null | boolean>(
    null
  );

  const ref = useRef();
  const { fetchedUserCategories, setFetchedUserCategories } =
    useUserCategories();

  const handleAddCategory = async (category: Category) => {
    setIsLoading(true);
    const res = await agent.Categories.create(currentUser?.id!, category);
    if (res?.isSuccess) setFetchedUserCategories(res?.result);
    setIsLoading(false);
    setAddCategoryOpened(null);
  };

  const handleChange = (type: string, value: any, subtype?: string) => {
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
      // Přidání nové kategorie
      let sanitizedValue = value;
      if (value.includes("createNew")) {
        sanitizedValue = value.filter((v: string) => v !== "createNew");
        setAddCategoryOpened(true);
      }

      setSelectedMovie((prev: any) => ({
        ...prev,
        [type]:
          typeof sanitizedValue === "string"
            ? sanitizedValue.split(",")
            : sanitizedValue,
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
    setIsLoading(true);
    const defaultCategories = await agent.Search.categories(
      selectedMovie.genre_ids
    );
    const userCategoriesObjects = selectedMovie.userCategories.map((name) => {
      const id = fetchedUserCategories.find(
        (fuc: Category) => fuc.name === name
      ).id;
      return { id, name } as Category;
    });

    const finalMovieObject = {
      ...selectedMovie,
      defaultCategories,
      userCategories: userCategoriesObjects,
    };

    const mov = Mapper.mapToMovie(finalMovieObject, {
      id: currentUser?.id,
      name: currentUser?.name,
    });
    await agent.Movies.create(mov);
    setIsLoading(true);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        margin: "auto 0",
      }}
    >
      <Box sx={style}>
        <Typography id="title" variant="h6" component="h2">
          Save your personal information about the movie.
        </Typography>
        <Typography id="description" sx={{ mt: 2, paddingBottom: "1rem" }}>
          Below you can add your own comment, rating or assign the movie to you
          own categories.
        </Typography>
        <Accordion id="add-comment" heading="Date watched">
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
            rows={9}
            sx={{ width: "24.5rem" }}
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
        <div className="relative">
          <Accordion
            sx={{ marginTop: "1rem" }}
            id="add-categories"
            heading="Add your own categories"
          >
            <FormControl
              sx={{
                m: 1,
                width: 300,
                "& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
                  color: Theme.Color.teal_2,
                },
              }}
            >
              <InputLabel id="category-lbl">Categories</InputLabel>
              <Select
                labelId="category-lbl"
                name="userCategories"
                multiple
                ref={ref}
                value={selectedMovie.userCategories}
                onChange={(e: any) =>
                  handleChange(e.target.name, e.target.value, undefined)
                }
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="Categories"
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: Theme.Color.teal_2,
                      },
                      "&:hover > .MuiOutlinedInput-notchedOutline": {
                        borderColor: Theme.Color.teal_2,
                      },

                      "&.Mui-focused > .MuiOutlinedInput-notchedOutline": {
                        borderColor: Theme.Color.teal_2,
                      },
                    }}
                  />
                }
                renderValue={(selected: any) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected?.map((cat: any) => (
                      <Chip key={cat} label={cat} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                <MenuItem key="create-new" value="createNew">
                  -- Create new --
                </MenuItem>
                {fetchedUserCategories?.map((cat: Category) => (
                  <MenuItem key={cat.name} value={cat.name} id={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Accordion>
          <AddCategoryPopover
            open={!!addCategoryOpened}
            onClose={() => setAddCategoryOpened(false)}
            handleAddCategory={handleAddCategory}
            anchorEl={ref.current}
            isLoading={isLoading}
          />
        </div>
        <Button
          handleClick={saveMovie}
          text="Save"
          variant="outlined"
          color="secondary"
          sx={{ marginTop: "2rem" }}
          withLoading
          loading={isLoading}
        />
      </Box>
    </Modal>
  );
};

export default AddMovieModal;
