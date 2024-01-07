import {
  InputLabel,
  Select as MUISelect,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";

type Props = {
  value: any;
  onChange: (e: SelectChangeEvent) => void;
  label: string;
  options: any;
  name: string;
};

const Select = ({ value, onChange, label, options, name }: Props) => {
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
