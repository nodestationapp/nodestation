import { useFormikContext } from "formik";

import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

const variant_options = [
  {
    label: "Single",
    value: "single",
  },
  {
    label: "Multi",
    value: "multi",
  },
];

const SelectInput = ({ locked }) => {
  const { values, errors, setFieldValue, handleBlur } = useFormikContext();

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="variant-select-label">Variant</InputLabel>
        <Select
          key={values?.variant}
          name="multi"
          label="Variant"
          disabled={locked}
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
      <FormControlLabel
        name="required"
        label="Required"
        control={<Switch checked={values?.required} disabled={locked} />}
        onChange={(e) => setFieldValue("required", e.target.checked)}
      />
      {/* <DragOrderInput
        name="options"
        value={values?.options}
        onChange={(e) => setFieldValue("options", e.target.value)}
      /> */}
    </>
  );
};

export default SelectInput;
