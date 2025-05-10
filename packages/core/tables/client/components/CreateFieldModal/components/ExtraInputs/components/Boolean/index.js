import {
  Select,
  Divider,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useFormikContext } from "formik";

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
    <>
      <Divider />
      <FormControl fullWidth>
        <InputLabel id="default-select-label">Default</InputLabel>
        <Select
          key={values?.default}
          name="default"
          label="Default"
          disabled={locked}
          variant="outlined"
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
    </>
  );
};

export default Boolean;
