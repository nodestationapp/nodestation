import { useEffect } from "react";
import { useFormikContext } from "formik";

import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

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
      <FormControl fullWidth variant="standard">
        <InputLabel id="variant-select-label">Variant</InputLabel>
        <Select
          key={values?.variant}
          name="variant"
          label="Variant"
          disabled={locked}
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
        name="default"
        label="Default"
        variant="standard"
        value={values.default}
        disabled={locked}
        onBlur={handleBlur}
        error={errors.default}
        helperText={errors.default}
        onChange={(e) => setFieldValue("default", e.target.value)}
      />
      <FormControlLabel
        name="required"
        label="Required"
        control={<Switch checked={values?.required} disabled={locked} />}
        onChange={(e) => setFieldValue("required", e.target.checked)}
      />
    </>
  );
};

export default Text;
