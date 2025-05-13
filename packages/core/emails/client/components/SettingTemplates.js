import { useFormik } from "formik";
import { InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { useAuth } from "@nstation/core/auth/client/contexts/authMiddleware.js";

const SettingTemplates = () => {
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

  const variant_options = [];

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
          name="default"
          labelId="email-verification-label"
        >
          {variant_options?.map((item) => (
            <MenuItem value={item?.value}>{item?.label}</MenuItem>
          ))}
        </Select>
      </Stack>
      <Stack>
        <InputLabel id="forget-password-label">Forget password</InputLabel>
        <Select
          fullWidth
          size="medium"
          name="default"
          labelId="forget-password-label"
        >
          {variant_options?.map((item) => (
            <MenuItem value={item?.value}>{item?.label}</MenuItem>
          ))}
        </Select>
      </Stack>
    </Stack>
  );
};

export default SettingTemplates;
