import "./styles.scss";

import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Button from "components/Button";
import FormikInput from "components/formik/FormikInput";
import PlaceholderPage from "components/PlaceholderPage";

import api from "libs/api";
import resetPasswordConfirmSchema from "libs/validations/resetPasswordConfirmSchema";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

const mainClass = "login-content";

const ResetPasswordContent = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(search);
  const token = query.get("token");

  const [reset_sent, setResetSent] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await api.get(`/auth/password-reset?token=${token}`);
        setLoading(false);
      } catch (err) {
        navigate("/");
      }
    })();
    // eslint-disable-next-line
  }, []);

  const onSubmit = async (values, setSubmitting) => {
    try {
      await api.post("/auth/password-reset/confirm", {
        ...values,
        token,
      });
      setResetSent(true);
    } catch (err) {
      setSubmitting(false);
    }
  };

  if (!!loading) return null;

  return !!reset_sent ? (
    <PlaceholderPage
      icon={<PaperAirplaneIcon />}
      header="Password has been changed successfully!"
      sub_header="Now you can login to dashboard"
      action={{
        label: "Go to login",
        href: "/login",
      }}
    />
  ) : (
    <div className={mainClass}>
      <div className={`${mainClass}__wrapper`}>
        <div className={`${mainClass}__wrapper__header`}>
          <h1>Reset your password</h1>
          <span>Provide your new password and login to dashboard</span>
        </div>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={resetPasswordConfirmSchema}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            onSubmit(values, setSubmitting, setErrors);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="form" autoComplete="off">
              <FormikInput
                name="password"
                type="password"
                label="New password"
                disabled={isSubmitting}
              />
              <FormikInput
                name="password2"
                type="password"
                label="Confirm new password"
                disabled={isSubmitting}
              />
              <Button type="submit" loading={!!isSubmitting} fullWidth>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        <div className={`${mainClass}__wrapper__bottom`}>
          <Link to="/">Back to Log in?</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordContent;
