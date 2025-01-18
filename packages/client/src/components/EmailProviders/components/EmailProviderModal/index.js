import "./styles.scss";

import { Form, Formik } from "formik";

import KeyViewer from "components/KeyViewer";
import AsideModal from "components/AsideModal";
import FormikInput from "components/formik/FormikInput";
import FormikSelect from "components/formik/FormikSelect";

import { useEmails } from "context/client/emails";
import emailSettingsFields from "libs/helpers/emailSettingsFields";

const title_render = (type) => {
  switch (type) {
    case "smtp":
      return "SMTP";
    case "sendgrid":
      return "Sendgrid";
    case "mailchimp":
      return "Mailchimp";
    case "mailgun":
      return "Mailgun";
    case "aws":
      return "Amazon SES";
    case "elastic":
      return "Elastic Email";
    default:
      return "";
  }
};

const input_render = (item) => {
  switch (item?.type) {
    case "select":
      return (
        <FormikSelect
          name={item?.name}
          label={item?.label}
          options={item?.options}
        />
      );
    default:
      return (
        <FormikInput type={item?.type} name={item?.name} label={item?.label} />
      );
  }
};

const EmailProviderModal = ({ type = "smtp", onClose }) => {
  const { email_settings, updateEmailSettings } = useEmails();

  const onSubmit = async (values, setSubmitting) => {
    try {
      await updateEmailSettings(values);
      onClose();
    } catch (err) {
      setSubmitting(false);
      console.error(err);
    }
  };

  const settings_fields = emailSettingsFields(type, email_settings);
  const title = title_render(type);

  const initial_values = settings_fields.reduce((acc, item) => {
    acc[item.name] = item.value || "";
    return acc;
  }, {});

  return (
    <Formik
      initialValues={{
        type,
        ...initial_values,
      }}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values, setSubmitting);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <AsideModal
          header={title}
          onSubmit={submitForm}
          loading={isSubmitting}
          submit_label={
            <>
              Save
              <KeyViewer data={["⌘", "S"]} />
            </>
          }
          onClose={onClose}
        >
          <Form className="form" autoComplete="off" style={{ width: "100%" }}>
            {settings_fields?.map((item) => input_render(item))}
          </Form>
        </AsideModal>
      )}
    </Formik>
  );
};

export default EmailProviderModal;
