import React, { ChangeEvent } from "react";
import { TextField as MuiInput } from "@mui/material";
import { Theme } from "../common/theme";
import { TextFieldVariants } from "@mui/material";

type Props = {
  color: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  sx?: any;
  variant?: TextFieldVariants;
  size?: "small" | "medium";
};

const Input = ({
  color,
  name,
  label,
  value,
  onChange,
  type,
  sx,
  variant = "outlined",
  size = "medium",
}: Props) => {
  const defaultStyle = {
    "& label.Mui-focused": { color: color },
    "& .MuiInput-underline:after": {
      borderBottomColor: color,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: color,
      },
    },
  };

  const finalStyle = { ...defaultStyle, ...sx };

  return (
    <MuiInput
      name={name}
      variant={variant}
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      sx={finalStyle}
      size={size}
    />
  );
};

export default Input;
