import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import { useFormikContext } from "formik";

const variant_options = [
  {
    label: "generate_id()",
    value: "generate_id()",
  },
];

const Id = ({ locked }) => {
  const { values, errors, setFieldValue, handleBlur } = useFormikContext();

  return (
    <>
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
          {variant_options?.map((item) => (
            <MenuItem value={item?.value}>{item?.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <FormikRefTable label="Relation" name="relation" /> */}
      <FormControlLabel
        name="required"
        label="Required"
        control={<Switch checked={values?.required} disabled={locked} />}
        onChange={(e) => setFieldValue("required", e.target.checked)}
      />
    </>
  );
};

export default Id;
