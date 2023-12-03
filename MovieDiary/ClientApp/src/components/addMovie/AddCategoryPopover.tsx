import Popover from "@mui/material/Popover";
import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { Theme } from "../../common/theme";

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddCategoryPopover = ({ open, onClose }: Props) => {
  const [category, setCategory] = useState("");
  const handleAddCategory = () => {};

  return (
    <Popover
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={open}
      onClose={onClose}
    >
      <div className="flex h-12">
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCategory(e.target.value)
          }
          color={Theme.Color.teal_2}
          variant="filled"
          value={category}
          label="Add category"
          name="add-category"
          size="small"
          sx={{ height: "1rem" }}
        />
        <Button
          text="Create"
          handleClick={handleAddCategory}
          variant="outlined"
          color="secondary"
        />
      </div>
    </Popover>
  );
};

export default AddCategoryPopover;
