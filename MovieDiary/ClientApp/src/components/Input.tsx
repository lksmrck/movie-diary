import React, { ChangeEvent } from "react";
import { TextField as MuiInput } from "@mui/material";
import { Theme } from "../common/theme";

type Props = {
  color: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  sx?: any;
};

const Input = ({ color, name, label, value, onChange, type, sx }: Props) => {
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
      variant="outlined"
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      sx={finalStyle}
    />
  );
};

export default Input;
