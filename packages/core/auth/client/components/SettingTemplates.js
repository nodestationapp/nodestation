import { useFormik } from "formik";
import { useQuery } from "@tanstack/react-query";
import { Button, InputLabel, MenuItem, Select, Stack } from "@mui/material";

import api from "../../../../client/src/utils/api.js";
import { useAuth } from "../contexts/authMiddleware.js";

const SettingTemplates = () => {
  const { user } = useAuth();

  const { data: emails } = useQuery({
    queryKey: ["emails"],
    queryFn: () => api.get("/emails"),
  });

  const formatted_emails = emails?.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await api.put("/auth/templates", values);
      resetForm({ values });
    } catch (err) {
      console.error(err);
    }

    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      email_verification_template: user?.templates?.email_verification_template,
      forget_password_template: user?.templates?.forget_password_template,
    },
    onSubmit,
  });

  return (
    <Stack
      component="form"
      onSubmit={formik.handleSubmit}
      container
      spacing={2}
      sx={{ mt: 1, maxWidth: 450 }}
    >
      <Stack>
        <InputLabel id="email-verification-label">
          Email address verification
        </InputLabel>
        <Select
          fullWidth
          size="medium"
          name="email_verification_template"
          labelId="email-verification-label"
          onChange={formik.handleChange}
          value={formik.values.email_verification_template}
        >
          {formatted_emails?.map((item) => (
            <MenuItem value={item?.value}>{item?.label}</MenuItem>
          ))}
        </Select>
      </Stack>
      <Stack>
        <InputLabel id="forget-password-label">Forget password</InputLabel>
        <Select
          fullWidth
          size="medium"
          value={formik.values.forget_password_template}
          onChange={formik.handleChange}
          name="forget_password_template"
          labelId="forget-password-label"
        >
          {formatted_emails?.map((item) => (
            <MenuItem value={item?.value}>{item?.label}</MenuItem>
          ))}
        </Select>
      </Stack>
      <Button
        type="submit"
        variant="contained"
        disabled={!formik.dirty}
        loading={formik.isSubmitting}
        onClick={formik.handleSubmit}
      >
        Save
      </Button>
    </Stack>
  );
};

export default SettingTemplates;
