import TextField from "@mui/material/TextField";

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((current, key) => current?.[key], obj);
};

const TextInput = ({ data, formik, type }) => {
  return (
    <TextField
      fullWidth
      multiline={data?.variant === "long" ? true : false}
      minRows={data?.variant === "long" ? 5 : null}
      maxRows={data?.variant === "long" ? 10 : null}
      name={data?.slug}
      label={data?.name}
      variant="standard"
      required={data?.required}
      onBlur={formik.handleBlur}
      type={type || data?.type || "text"}
      disabled={!!data?.read_only}
      onChange={formik.handleChange}
      value={getNestedValue(formik.values, data?.slug) || ""}
      error={!!formik?.errors?.[data?.slug]}
      helperText={formik?.errors?.[data?.slug]}
    />
  );
};

export default TextInput;
