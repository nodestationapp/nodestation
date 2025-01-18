import "./styles.scss";

import { Form, Formik } from "formik";
import { Link } from "react-router-dom";

import Button from "components/Button";
import FormikInput from "components/formik/FormikInput";

import resetPasswordSchema from "libs/validations/resetPasswordSchema";
import { useState } from "react";
import PlaceholderPage from "components/PlaceholderPage";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import api from "libs/api";

const mainClass = "login-content";

const ForgetPasswordContent = () => {
  const [reset_sent, setResetSent] = useState(false);

  const onSubmit = async (values, setSubmitting, setErrors) => {
    try {
      await api.post("/auth/password-reset", values);
      setResetSent(values?.email);
    } catch (err) {
      setErrors({
        email: "Incorrect e-mail address",
      });
      setSubmitting(false);
    }
  };

  return !!reset_sent ? (
    <PlaceholderPage
      icon={<PaperAirplaneIcon />}
      header="We have sent instructions on how to reset your password onto your e-mail"
      sub_header="Make sure to check your spam box as well"
      action={{
        label: "Go to login",
        href: "/login",
      }}
    />
  ) : (
    <div className={mainClass}>
      <div className={`${mainClass}__wrapper`}>
        <div className={`${mainClass}__wrapper__header`}>
          <h1>Forgot your password?</h1>
          <span>We will send you instructions to your email address</span>
        </div>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={resetPasswordSchema}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            onSubmit(values, setSubmitting, setErrors);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="form" autoComplete="off">
              <FormikInput
                name="email"
                type="email"
                label="Email"
                disabled={isSubmitting}
              />
              <Button type="submit" loading={!!isSubmitting} fullWidth>
                Reset password
              </Button>
            </Form>
          )}
        </Formik>
        <div className={`${mainClass}__wrapper__bottom`}>
          <Link to="/login">Back to Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordContent;
