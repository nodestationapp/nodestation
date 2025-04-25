import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";

import api from "libs/api";
import { toast } from "react-toastify";

const ChangePasswordForm = () => {
  const onSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    try {
      await api.put("/api/plugins/auth/change-password", values);
      toast.success("Password has been changed");
      resetForm({ current_password: "", new_password: "", new_password2: "" });
    } catch (err) {
      setErrors(err?.response?.data?.errors);

      console.error(err);
    }

    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
      new_password2: "",
    },
    onSubmit,
  });

  return (
    <Stack
      direction="column"
      gap={2}
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ maxWidth: 400, width: "100%" }}
    >
      <TextField
        fullWidth
        type="password"
        variant="outlined"
        placeholder="••••••"
        name="current_password"
        label="Current password"
        error={formik.errors.current_password}
        value={formik.values.current_password}
        helperText={formik.errors.current_password}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      <TextField
        type="password"
        variant="outlined"
        name="new_password"
        placeholder="••••••"
        label="New password"
        error={formik.errors.new_password}
        value={formik.values.new_password}
        helperText={formik.errors.new_password}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      <TextField
        fullWidth
        type="password"
        variant="outlined"
        name="new_password2"
        placeholder="••••••"
        label="Confirm new password"
        error={formik.errors.new_password2}
        value={formik.values.new_password2}
        helperText={formik.errors.new_password2}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={
          !formik.values.current_password ||
          !formik.values.new_password ||
          !formik.values.new_password2
        }
        loading={formik.isSubmitting}
        color="primary"
        size="small"
      >
        Change password
      </Button>
    </Stack>
  );
};

export default ChangePasswordForm;
