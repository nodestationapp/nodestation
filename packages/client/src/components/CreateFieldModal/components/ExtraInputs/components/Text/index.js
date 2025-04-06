import { useEffect } from "react";
import { useFormikContext } from "formik";

import {
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";

const variant_options = [
  {
    label: "Short",
    value: "short",
  },
  {
    label: "Long",
    value: "long",
  },
];

const Text = ({ locked }) => {
  const { values, errors, setFieldValue, handleBlur } = useFormikContext();

  useEffect(() => {
    if (!!values?.variant) return;
    setFieldValue("variant", "short");
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Divider />
      <FormControl fullWidth>
        <InputLabel id="variant-select-label">Variant</InputLabel>
        <Select
          key={values?.variant}
          name="variant"
          label="Variant"
          variant="outlined"
          labelId="variant-select-label"
          value={values.variant}
          onChange={(e) => setFieldValue("variant", e.target.value)}
          onBlur={handleBlur}
          error={errors.variant}
          helperText={errors.variant}
        >
          {variant_options?.map((item) => (
            <MenuItem value={item?.value}>{item?.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        multiline
        name="default"
        label="Default"
        variant="outlined"
        value={values.default}
        onBlur={handleBlur}
        error={errors.default}
        helperText={errors.default}
        onChange={(e) => setFieldValue("default", e.target.value)}
      />
      {/* todo: <FormikTextarea label="Default value" name="default" /> */}
      <FormControlLabel
        label="Required"
        disabled={locked}
        control={<Switch />}
        onChange={(e) => setFieldValue("required", e.target.checked)}
      />
    </>
  );
};

export default Text;
