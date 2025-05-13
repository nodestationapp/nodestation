import { useFormik } from "formik";
import { Button, Grid, TextField } from "@mui/material";
import { useAuth } from "@nstation/core/auth/client/contexts/authMiddleware.js";

const Form = () => {
  const { user, userUpdate } = useAuth();

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await userUpdate(values);
      resetForm({ values });
    } catch (err) {
      console.error(err);
    }

    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
    },
    onSubmit,
  });

  return (
    <Grid
      component="form"
      onSubmit={formik.handleSubmit}
      container
      spacing={2}
      sx={{ mt: 3, maxWidth: 500 }}
    >
      <Grid size={6}>
        <TextField
          fullWidth
          type="text"
          name="first_name"
          label="First Name"
          variant="outlined"
          placeholder="First Name"
          autoComplete="first_name"
          error={formik.errors.first_name}
          helperText={formik.errors.first_name}
          value={formik.values.first_name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </Grid>
      <Grid size={6}>
        <TextField
          fullWidth
          type="text"
          name="last_name"
          label="Last Name"
          variant="outlined"
          placeholder="Last Name"
          autoComplete="last_name"
          error={formik.errors.last_name}
          helperText={formik.errors.last_name}
          value={formik.values.last_name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          disabled
          fullWidth
          id="email"
          type="text"
          name="email"
          label="Email"
          variant="outlined"
          value={user?.email}
        />
      </Grid>
      <Button
        type="submit"
        variant="contained"
        disabled={!formik.dirty}
        loading={formik.isSubmitting}
        color="primary"
      >
        Save
      </Button>
    </Grid>
  );
};

export default Form;
