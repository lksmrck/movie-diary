import React from "react";
import { Button as MUIButton } from "@mui/material";

type Props = {
  handleClick: () => void;
  variant: "text" | "contained" | "outlined";
  disabled?: boolean;
  text: string;
};

const Button = ({ handleClick, variant, disabled, text }: Props) => {
  return (
    <MUIButton
      variant={variant}
      onClick={handleClick}
      disabled={disabled ?? false}
    >
      {text}
    </MUIButton>
  );
};

export default Button;
