import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import Stack from "@mui/material/Stack";

import { AsideModal } from "@nstation/design-system";
import { clientFieldTypes } from "@nstation/field-types";

import { useEmails } from "../contexts/emails.js";
import emailSettingsFields from "../utils/emailSettingsFields.js";

const provider_options = [
  { label: "SMTP", value: "smtp" },
  { label: "AWS", value: "aws" },
  { label: "Elastic Email", value: "elastic" },
  { label: "Mailgun", value: "mailgun" },
  { label: "Mailchimp", value: "mailchimp" },
];

const ProviderSettingsModal = ({ open, onClose }) => {
  const { email_settings, addEmailProvider, updateEmailProvider } = useEmails();
  const fieldTypes = clientFieldTypes();

  const onSubmit = async (values, setSubmitting) => {
    try {
      if (open?.id) {
        await updateEmailProvider(open?.id, values);
      } else {
        await addEmailProvider(values);
      }
      onClose();
    } catch (err) {
      setSubmitting(false);
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: open?.email || "",
      is_default: open?.is_default || 0,
      provider: open?.provider || "",
      content: open?.content || {},
    },
    onSubmit,
  });

  const settings_fields = emailSettingsFields(
    formik.values.provider,
    email_settings
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <AsideModal
        open={open}
        onClose={onClose}
        onSubmit={formik.handleSubmit}
        submitLoading={formik.isSubmitting}
        header={open?.content?.email || "Add new provider"}
      >
        <Stack gap={2} direction="column">
          <FormControl fullWidth variant="standard">
            <InputLabel id="default-select-label">Provider</InputLabel>
            <Select
              name="provider"
              label="Provider"
              disabled={false}
              labelId="default-select-label"
              value={formik.values.provider}
              onChange={(e) => formik.setFieldValue("provider", e.target.value)}
              onBlur={formik.handleBlur}
              error={formik.errors.provider}
            >
              {provider_options.map((item, index) => (
                <MenuItem key={item.value || index} value={item?.value}>
                  {item?.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            sx={{
              marginLeft: 0,
            }}
            control={
              <Checkbox
                name="is_default"
                defaultChecked={formik.values.is_default}
                checked={formik.values.is_default}
                onChange={(e) =>
                  formik.setFieldValue("is_default", e.target.checked ? 1 : 0)
                }
                sx={{
                  margin: 0,
                  marginRight: "10px",
                }}
              />
            }
            label="Default"
          />
          {!!settings_fields && (
            <>
              <Divider />
              {settings_fields?.map((data) => {
                data.slug =
                  data?.slug === "email" ? "email" : `content.${data.slug}`;

                const inputRender = fieldTypes?.find(
                  (item) => data?.type || "text" === item?.key
                )?.inputRender;

                if (!!inputRender) {
                  return inputRender({ data, formik });
                } else {
                  return null;
                }
              })}
            </>
          )}
        </Stack>
      </AsideModal>
    </form>
  );
};

export default ProviderSettingsModal;
