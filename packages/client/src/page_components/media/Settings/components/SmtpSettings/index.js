import "./styles.scss";

import { Form, Formik } from "formik";

import Button from "components/Button";
import FormikInput from "components/formik/FormikInput";
import FormikSelect from "components/formik/FormikSelect";

import { useApp } from "context/app";

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
  const { user, userUpdate } = useApp();

  const onSubmit = async (values, setSubmitting) => {
    try {
      const email_settings = { ...values };
      await userUpdate({ email_settings });
    } catch (err) {
      console.error(err);
    }

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        type: "smtp",
        host: user?.email_settings?.content?.host || "",
        email: user?.email_settings?.content?.email || "",
        password: user?.email_settings?.content?.password || "",
        port: user?.email_settings?.content?.port || "",
        tls: user?.email_settings?.content?.tls || "",
        header: user?.email_settings?.content?.header || "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values, setSubmitting);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="form" autoComplete="off" style={{ width: "100%" }}>
          <FormikInput name="host" label="Host / Server name" />
          <FormikInput name="email" label="Email" />
          <FormikInput name="password" label="Password" />
          <FormikInput name="port" label="Port" />
          <FormikSelect name="tls" label="TLS" options={tls_data} />
          <FormikInput name="header" label="Header" />
          <Button size="large" fullWidth type="submit" loading={isSubmitting}>
            Save changes
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SmtpSettings;
