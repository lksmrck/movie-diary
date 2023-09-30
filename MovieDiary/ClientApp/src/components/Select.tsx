import React, { ChangeEvent } from "react";
import {
  InputLabel,
  Select as MUISelect,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";

type Props = {
  value: any;
  onChange: (e: SelectChangeEvent) => void; //ChangeEvent<HTMLSelectElement>
  label: string;
  options: any; //{ id: string; name: string }[]
  name: string;
};

const Select = ({ value, onChange, label, options, name }: Props) => {
  console.log(value);
  const values = value?.map((c: any) => c?.name) ?? [];
  return (
    <>
      <InputLabel id={label}>{label}</InputLabel>
      <MUISelect
        labelId={label}
        name={name}
        value={value}
        onChange={onChange}
        input={<OutlinedInput label={label} />}
        multiple
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((o: any) => (
          <MenuItem key={o} value={o}>
            {o}
          </MenuItem>
        ))}
      </MUISelect>
    </>
  );
};

export default Select;
