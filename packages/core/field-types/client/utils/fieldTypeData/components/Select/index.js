import { useFormikContext } from "formik";

import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";

import Options from "./Options.js";

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
      <Stack>
        <InputLabel id="variant-select-label">Variant</InputLabel>
        <Select
          key={values?.variant}
          name="multi"
          label="Variant"
          disabled={locked}
          variant="standard"
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
      </Stack>
      <Stack>
        <InputLabel id="variant-select-label">Default</InputLabel>
        <Select
          key={values?.default}
          name="default"
          label="Default"
          disabled={locked}
          variant="standard"
          labelId="default-select-label"
          value={values.default}
          onChange={(e) => setFieldValue("default", e.target.value)}
          onBlur={handleBlur}
          error={errors.default}
          helperText={errors.default}
        >
          {values.options?.map((item) => (
            <MenuItem value={item?.value}>{item?.label}</MenuItem>
          ))}
        </Select>
      </Stack>
      <FormControlLabel
        name="required"
        label="Required"
        control={<Switch checked={values?.required} disabled={locked} />}
        onChange={(e) => setFieldValue("required", e.target.checked)}
      />
      <Divider />
      <Options
        value={values.options}
        onChange={(value) => setFieldValue("options", value)}
      />
    </>
  );
};

export default SelectInput;
