import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import Input from "../Input";
import { Theme } from "../../common/theme";
import Rating from "../Rating";
import { Movie } from "../../models/Movie";
import Select from "../Select";
import Accordion from "../Accordion";

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
  const [formValues, setFormValues] = useState<any>({ categories: [] } as any); //bude <Movie>
  const { comment, rating, categories, user } = formValues;

  const handleChange = (
    type: string,
    value: string | number,
    subtype?: string
  ) => {
    // if (subtype) setFormValues((prev) => {
    //   return {...prev, prev[type]: {...prev[type], prev[type][subtype]: value}}
    // })

    if (subtype) {
      setFormValues((prev: any) => ({
        ...prev,
        [type]: {
          ...prev[type],
          [subtype]: value,
        },
      }));
    }

    if (!subtype) {
      setFormValues((prev: any) => ({
        ...prev,
        [type]: typeof value === "string" ? value.split(",") : value,
      }));
    }
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
            value={categories}
            onChange={(e) => {
              console.log(e.target.value);
              handleChange(e.target.name, e.target.value, undefined);
            }}
            label="Categories"
            options={dummy_list}
          />
        </Accordion>

        {/* toto bude user specific category */}

        {/* <Input name="comment" label="Comment" color={Theme.color.primary} value={} /> */}
      </Box>
    </Modal>
  );
};

export default AddMovieModal;
