import { useFormikContext } from "formik";

import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

const variant_options = [
  {
    label: "now()",
    value: "now()",
  },
];

const Date = ({ locked }) => {
  const { values, errors, setFieldValue, handleBlur } = useFormikContext();

  return (
    <>
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
          {variant_options?.map((item) => (
            <MenuItem value={item?.value}>{item?.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel
        name="required"
        label="Required"
        control={<Switch checked={values?.required} disabled={locked} />}
        onChange={(e) => setFieldValue("required", e.target.checked)}
      />
    </>
  );
};

export default Date;
