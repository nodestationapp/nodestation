import "./styles.scss";

import { Form, Formik } from "formik";

import Button from "components/Button";
import FormikInput from "components/formik/FormikInput";
import FormikSelect from "components/formik/FormikSelect";

import { useEmails } from "context/client/emails";
import api from "libs/api";

const tls_data = [
  {
    label: "SSL",
    value: "ssl",
  },
  {
    label: "STARTTLS",
    value: "starttls",
  },
];

const SmtpSettings = () => {
  const { email_settings, settings_loading, refetchEmailSettings } =
    useEmails();

  const onSubmit = async (values, setSubmitting, resetForm) => {
    try {
      await api.put("/emails/settings", { ...values });

      refetchEmailSettings();
      resetForm({ values });
    } catch (err) {
      console.error(err);
    }

    setSubmitting(false);
  };

  if (!!settings_loading) return null;

  return (
    <Formik
      initialValues={{
        type: "smtp",
        host: email_settings?.host || "",
        email: email_settings?.email || "",
        password: email_settings?.password || "",
        port: email_settings?.port || "",
        tls: email_settings?.tls || "",
        header: email_settings?.header || "",
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmit(values, setSubmitting, resetForm);
      }}
    >
      {({ isSubmitting, dirty }) => (
        <Form className="form" autoComplete="off" style={{ width: "100%" }}>
          <FormikInput name="host" label="Host / Server name" />
          <FormikInput name="password" label="Password" />
          <FormikSelect name="tls" label="TLS" options={tls_data} />
          <FormikInput name="email" label="Email" />
          <FormikInput name="port" label="Port" />
          <FormikInput name="header" label="Header" />
          <Button
            size="large"
            fullWidth
            type="submit"
            loading={isSubmitting}
            disabled={!!!dirty}
          >
            Save changes
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SmtpSettings;
