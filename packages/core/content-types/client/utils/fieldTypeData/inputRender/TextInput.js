import TextField from "@mui/material/TextField";

const TextInput = ({ data, formik, type }) => {
  return (
    <TextField
      fullWidth
      name={data?.slug}
      label={data?.name}
      variant="standard"
      required={data?.required}
      onBlur={formik.handleBlur}
      type={type || data?.type || "text"}
      disabled={!!data?.read_only}
      onChange={formik.handleChange}
      value={formik.values[data?.slug]}
      error={!!formik?.errors?.[data?.slug]}
      helperText={formik?.errors?.[data?.slug]}
    />
  );
};

export default TextInput;
