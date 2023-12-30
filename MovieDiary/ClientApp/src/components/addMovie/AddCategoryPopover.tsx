import Popover from "@mui/material/Popover";
import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { Theme } from "../../common/theme";
import { Category } from "../../models/Movie";

type Props = {
  open: boolean;
  onClose: () => void;
  handleAddCategory: (category: Category) => void;
  anchorEl: any;
  isLoading: boolean;
};

const AddCategoryPopover = ({
  open,
  onClose,
  handleAddCategory,
  anchorEl,
  isLoading,
}: Props) => {
  const [category, setCategory] = useState("");

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <div className="flex h-12 ">
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
          handleClick={() => handleAddCategory({ name: category })}
          variant="contained"
          color="primary"
          size="small"
          withLoading
          loading={isLoading}
        />
      </div>
    </Popover>
  );
};

export default AddCategoryPopover;
