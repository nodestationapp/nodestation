import { useEffect } from "react";
import { useFormikContext } from "formik";

import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";

const Json = ({ locked }) => {
  const { values, errors, setFieldValue, handleBlur } = useFormikContext();

  useEffect(() => {
    if (!!values?.variant) return;
    setFieldValue("variant", "short");
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <TextField
        fullWidth
        name="default"
        label="Default"
        variant="standard"
        InputLabelProps={{ shrink: true }}
        value={values.default}
        placeholder="Enter JSON"
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

export default Json;
