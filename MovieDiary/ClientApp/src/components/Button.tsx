import React from "react";
import { Button as MUIButton } from "@mui/material";

import { Theme } from "../common/theme";

type Props = {
  handleClick: () => void;
  variant: "text" | "contained" | "outlined";
  disabled?: boolean;
  text: string;
  color: "primary" | "secondary";
};

const Button = ({ handleClick, variant, disabled, text, color }: Props) => {
  return (
    <MUIButton
      variant={variant}
      onClick={handleClick}
      disabled={disabled}
      sx={{
        backgroundColor:
          color == "primary" ? Theme.Color.teal_2 : Theme.Color.teal_3,

        "&:hover": {
          backgroundColor:
            color == "primary" ? Theme.Color.teal_1 : Theme.Color.teal_2,
        },
        color: "white",
      }}
    >
      {text}
    </MUIButton>
  );
};

export default Button;
