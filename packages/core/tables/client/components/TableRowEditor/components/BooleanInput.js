import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const boolean_options = [
  {
    label: "NULL",
    value: "null",
  },
  {
    label: "TRUE",
    value: 1,
  },
  {
    label: "FALSE",
    value: 0,
  },
];

const BooleanInput = ({ label, slug, value, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={slug}>{label}</InputLabel>
      <Select
        fullWidth
        label={label}
        size="medium"
        variant="outlined"
        name={slug}
        labelId={slug}
        onChange={onChange}
        value={value}
      >
        {boolean_options?.map((item) => (
          <MenuItem value={item?.value}>{item?.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BooleanInput;
