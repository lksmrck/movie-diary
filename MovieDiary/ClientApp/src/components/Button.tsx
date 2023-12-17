import React from "react";
import { ButtonPropsSizeOverrides, Button as MUIButton } from "@mui/material";

import { Theme } from "../common/theme";

type Props = {
  handleClick: () => void;
  variant: "text" | "contained" | "outlined";
  disabled?: boolean;
  text: string;
  color: "primary" | "secondary";
  sx?: Object;
  size?: "small" | "medium" | "large";
};

const Button = ({
  handleClick,
  variant,
  disabled,
  text,
  color,
  sx = {},
  size,
}: Props) => {
  const backgroundColorHover =
    color == "primary" ? Theme.Color.teal_2 : Theme.Color.teal_4;

  return (
    <MUIButton
      variant={variant}
      onClick={handleClick}
      disabled={disabled}
      size={size}
      sx={{
        ...sx,
        border: `1px solid ${
          color == "primary" ? Theme.Color.teal_2 : Theme.Color.teal_3
        }`,
        backgroundColor:
          color == "primary" ? Theme.Color.teal_1 : Theme.Color.teal_3,

        "&:hover": {
          backgroundColor: backgroundColorHover,
          border: `1px solid ${backgroundColorHover}`,
        },
        color: "white",
      }}
    >
      {text}
    </MUIButton>
  );
};

export default Button;
