import "./styles.scss";

import { Form, Formik } from "formik";
import { toast } from "react-toastify";

import Button from "components/Button";
import FormikInput from "components/formik/FormikInput";

import api from "libs/api";

const mainClass = "change-password-form";

const ChangePasswordForm = () => {
  const onSubmit = async (values, setSubmitting, resetForm, setErrors) => {
    try {
      await api.put("/auth/change-password", values);
      toast.success("Password has been changed");
      resetForm({ current_password: "", new_password: "", new_password2: "" });
    } catch (err) {
      setErrors(err?.response?.data?.errors);

      console.error(err);
    }

    setSubmitting(false);
  };

  return (
    <div className={mainClass}>
      <Formik
        initialValues={{
          current_password: "",
          new_password: "",
          new_password2: "",
        }}
        onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
          onSubmit(values, setSubmitting, resetForm, setErrors);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="form" autoComplete="off" style={{ width: "100%" }}>
            <FormikInput
              variant="light"
              type="password"
              name="current_password"
              label="Current password"
            />
            <FormikInput
              variant="light"
              type="password"
              name="new_password"
              label="New password"
            />
            <FormikInput
              variant="light"
              type="password"
              name="new_password2"
              label="Confirm new password"
            />
            <Button
              type="submit"
              disabled={
                !!!values?.current_password ||
                !!!values?.new_password ||
                !!!values?.new_password2
              }
              loading={isSubmitting}
            >
              Change password
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswordForm;
