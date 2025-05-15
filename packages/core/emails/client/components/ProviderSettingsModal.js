import { useFormik } from "formik";
import Stack from "@mui/material/Stack";

import { AsideModal } from "@nstation/design-system";

import { useEmails } from "../contexts/emails.js";
import emailSettingsFields from "../utils/emailSettingsFields.js";
import tableInputRender from "../../../tables/client/components/TableRowEditor/components/tableInputRender.js";

const title_render = (type) => {
  switch (type) {
    case "smtp":
      return "SMTP";
    case "aws":
      return "Amazon SES";
    case "elastic":
      return "Elastic Email";
    case "mailgun":
      return "Mailgun";
    case "mailchimp":
      return "Mailchimp";
    default:
      return "";
  }
};

const ProviderSettingsModal = ({ open, onClose }) => {
  const { email_settings, updateEmailSettings } = useEmails();

  const title = title_render(open);
  const settings_fields = emailSettingsFields(open, email_settings);

  const initialValues = settings_fields.reduce((acc, item) => {
    acc[item.slug] = item.value || "";
    return acc;
  }, {});

  const onSubmit = async (values, setSubmitting) => {
    try {
      await updateEmailSettings({ [open]: values });
      onClose();
    } catch (err) {
      setSubmitting(false);
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <AsideModal
        open={open}
        onClose={onClose}
        onSubmit={formik.handleSubmit}
        submitLoading={formik.isSubmitting}
        header={title}
      >
        <Stack gap={2} direction="column">
          {settings_fields?.map((item) => tableInputRender(item, formik))}
        </Stack>
      </AsideModal>
    </form>
  );
};

export default ProviderSettingsModal;
