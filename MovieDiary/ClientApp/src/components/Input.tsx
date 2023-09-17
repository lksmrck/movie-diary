import React from "react";
import { TextField as MuiInput } from "@mui/material";
import { Theme } from "../common/theme";

type Props = {
  color: string;
};

const Input = ({ color }: Props) => {
  return (
    <MuiInput
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
