import React from "react";
import { TextField as MuiInput } from "@mui/material";
import { Theme } from "../common/theme";

type Props = {
  color: string;
  label: string;
};

const Input = ({ color, label }: Props) => {
  return (
    <MuiInput
      variant="outlined"
      label={label}
      sx={{
        "& label.Mui-focused": { color: color },
        "& .MuiInput-underline:after": {
          borderBottomColor: color,
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: color,
          },
        },
      }}
    />
  );
};

export default Input;
