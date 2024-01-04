import React from "react";
import { ButtonPropsSizeOverrides, Button as MUIButton } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Theme } from "../common/theme";

type Props = {
  handleClick: () => void;
  variant: "text" | "contained" | "outlined";
  disabled?: boolean;
  text: string;
  color: "primary" | "secondary" | "red";
  sx?: Object;
  size?: "small" | "medium" | "large";
  withLoading?: boolean;
  loading?: boolean;
};

const Button = ({
  handleClick,
  variant,
  disabled,
  text,
  color,
  sx = {},
  size,
  withLoading,
  loading,
}: Props) => {
  // const backgroundColorHover =
  //   color == "primary" ? Theme.Color.teal_2 : Theme.Color.teal_4;

  const primaryStyle = {
    backgroundColor: Theme.Color.teal_1,
    border: `1px solid ${Theme.Color.teal_2}`,
    color: "white",
    "&:hover": {
      backgroundColor: Theme.Color.teal_2,
    },
  };

  const secondaryStyle = {
    backgroundColor: Theme.Color.teal_3,
    border: `1px solid ${Theme.Color.teal_4}`,
    color: "white",
    "&:hover": {
      backgroundColor: Theme.Color.teal_4,
      border: `1px solid ${Theme.Color.teal_4}`,
    },
  };

  const styleToApply =
    color === "primary"
      ? primaryStyle
      : color === "secondary"
      ? secondaryStyle
      : { color: "white" };

  return withLoading ? (
    <LoadingButton
      onClick={handleClick}
      variant={variant}
      loading={loading}
      size={size}
      color={color === "red" ? "error" : undefined}
      sx={{ ...styleToApply, ...sx }}
    >
      {text}
    </LoadingButton>
  ) : (
    <MUIButton
      variant={variant}
      onClick={handleClick}
      disabled={disabled}
      size={size}
      color={color === "red" ? "error" : undefined}
      sx={{ ...styleToApply, ...sx }}
    >
      {text}
    </MUIButton>
  );
};

export default Button;
