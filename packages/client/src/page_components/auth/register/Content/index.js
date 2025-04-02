import "./styles.scss";

import { Form, Formik } from "formik";
import { useLocation } from "react-router-dom";

import Button from "components/Button";
import FormikInput from "components/formik/FormikInput";

import api from "libs/api";

import { useApp } from "context/app";

import LogoIcon from "assets/icons/logo-sygnet.svg";

const mainClass = "login-content";

const RegisterContent = () => {
  const { setIsAdmin } = useApp();
  const navigate = useLocation();

  const onSubmit = async (values, setSubmitting, setErrors) => {
    try {
      await api.post("/auth/register", values);
      setIsAdmin(true);
      navigate("/login");
    } catch (err) {
      setSubmitting(false);
      setErrors(err?.response?.data?.errors);
    }
  };

  return (
    <div className={mainClass}>
      <div className={`${mainClass}__wrapper`}>
        <div className={`${mainClass}__wrapper__header`}>
          <LogoIcon />
          <h1>Sign up your admin account</h1>
        </div>
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            password: "",
          }}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            onSubmit(values, setSubmitting, setErrors);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="form" autoComplete="off">
              <FormikInput
                name="first_name"
                type="first_name"
                label="First name"
                disabled={isSubmitting}
              />
              <FormikInput
                name="last_name"
                type="last_name"
                label="Last name"
                disabled={isSubmitting}
              />
              <FormikInput
                name="email"
                type="email"
                label="Email"
                disabled={isSubmitting}
              />
              <FormikInput
                name="password"
                label="Password"
                type="password"
                disabled={isSubmitting}
              />
              <Button type="submit" loading={!!isSubmitting} fullWidth>
                Sign up
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterContent;
