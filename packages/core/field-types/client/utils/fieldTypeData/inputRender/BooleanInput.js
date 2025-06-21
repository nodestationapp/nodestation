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

const BooleanInput = ({ data, formik }) => {
  return (
    <FormControl fullWidth variant="standard">
      <InputLabel id={data?.slug}>{data?.name}</InputLabel>
      <Select
        fullWidth
        label={data?.name}
        size="medium"
        name={data?.slug}
        labelId={data?.slug}
        onChange={formik.handleChange}
        value={formik.values[data?.slug]}
      >
        {boolean_options?.map((item) => (
          <MenuItem value={item?.value}>{item?.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BooleanInput;
