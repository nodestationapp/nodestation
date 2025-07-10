import { useFormik } from "formik";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useLogger } from "../contexts/logger.js";

const NotificationSettings = () => {
  const { logger_settings, updateLoggerSettings } = useLogger();

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await updateLoggerSettings(values);
      resetForm({ values });
    } catch (err) {
      console.error(err);
    }

    setSubmitting(false);
  };

  const current_setting = logger_settings?.find(
    (setting) => setting.key === "errors_notification"
  );

  const formatted_body = !!current_setting?.body
    ? JSON.parse(current_setting?.body)
    : null;

  const formik = useFormik({
    initialValues: {
      active: current_setting?.active,
      key: "errors_notification",
      body: {
        send_to: formatted_body?.send_to || "",
      },
    },
    onSubmit,
  });

  const onActiveChange = async (e) => {
    try {
      formik.setFieldValue("active", e.target.checked ? 1 : 0);
      await updateLoggerSettings({
        key: "errors_notification",
        active: e.target.checked ? 1 : 0,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Stack direction="column" gap={2}>
      <Stack direction="column" alignItems="flex-start" gap={2.5}>
        <FormControlLabel
          sx={{
            marginLeft: 0,
          }}
          control={
            <Checkbox
              name="active"
              defaultChecked={formik.values.active}
              checked={formik.values.active}
              onChange={onActiveChange}
              sx={{
                margin: 0,
                marginRight: "10px",
              }}
            />
          }
          label="Alert me on system errors"
        />
        {!!formik?.values?.active && (
          <>
            <TextField
              fullWidth
              type="text"
              name="body.send_to"
              label="Email addresses"
              variant="outlined"
              placeholder="e.g. admin@example.com, support@example.com"
              error={formik.errors.body?.send_to}
              helperText={
                formik.errors.body?.send_to ||
                "Separate multiple email addresses with commas."
              }
              value={formik.values.body?.send_to}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              disabled={!formik.dirty}
              sx={{ mt: -1 }}
              onClick={formik.handleSubmit}
            >
              Save
            </Button>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default NotificationSettings;
