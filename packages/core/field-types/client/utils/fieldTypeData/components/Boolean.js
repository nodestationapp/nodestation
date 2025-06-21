import { useFormikContext } from "formik";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const default_options = [
  {
    label: "NULL",
    value: "null",
  },
  {
    label: "TRUE",
    value: true,
  },
  {
    label: "FALSE",
    value: false,
  },
];

const Boolean = ({ locked }) => {
  const { values, errors, setFieldValue, handleBlur } = useFormikContext();

  return (
    <FormControl fullWidth variant="standard">
      <InputLabel id="default-select-label">Default</InputLabel>
      <Select
        key={values?.default}
        name="default"
        label="Default"
        disabled={locked}
        labelId="default-select-label"
        value={values.default}
        onChange={(e) => setFieldValue("default", e.target.value)}
        onBlur={handleBlur}
        error={errors.default}
        helperText={errors.default}
      >
        {default_options?.map((item) => (
          <MenuItem value={item?.value}>{item?.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Boolean;
