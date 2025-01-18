import "./styles.scss";

import { Form, Formik } from "formik";

import Button from "components/Button";
import FormikInput from "components/formik/FormikInput";

import { useApp } from "context/app";

const GmailSettings = () => {
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
        type: "gmail",
        user: user?.email_settings?.user || "",
        pass: user?.email_settings?.pass || "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values, setSubmitting);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="form" autoComplete="off" style={{ width: "100%" }}>
          <FormikInput name="user" label="Username" />
          <FormikInput name="pass" label="Password" />
          <Button size="large" fullWidth type="submit" loading={isSubmitting}>
            Save changes
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default GmailSettings;
