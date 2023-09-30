import React from "react";
import { Rating as MUIRating } from "@mui/material";

type Props = {
  value: number;
  onChange: (e: any) => void;
  name: string;
};

const Rating = ({ value, onChange, name }: Props) => {
  return (
    <MUIRating
      name={name}
      value={value}
      onChange={onChange}
      size="small"
      max={10}
      precision={0.5}
    />
  );
};

export default Rating;
