import "./styles.scss";

import { Form, Formik } from "formik";
import { Link } from "react-router-dom";

import Button from "components/Button";
import FormikInput from "components/formik/FormikInput";

import { useApp } from "context/app";

import { ReactComponent as LogoIcon } from "assets/icons/logo-sygnet.svg";

const mainClass = "login-content";

const LoginContent = () => {
  const { login } = useApp();

  const onSubmit = async (values, setSubmitting, setErrors) => {
    try {
      await login(values);
    } catch (err) {
      setErrors(err?.response?.data?.errors);
      setSubmitting(false);
    }
  };

  return (
    <div className={mainClass}>
      <div className={`${mainClass}__wrapper`}>
        <div className={`${mainClass}__wrapper__header`}>
          <LogoIcon />
          <h1>Log in to your account</h1>
        </div>
        <Formik
          initialValues={{
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
                name="email"
                type="email"
                label="Email"
                disabled={isSubmitting}
              />
              <div className={`${mainClass}__wrapper__password`}>
                <FormikInput
                  name="password"
                  label="Password"
                  type="password"
                  disabled={isSubmitting}
                  aside={
                    <Link
                      className={`${mainClass}__wrapper__password__forget`}
                      to="/forget-password"
                    >
                      Forget password?
                    </Link>
                  }
                />
              </div>
              <Button type="submit" loading={!!isSubmitting} fullWidth>
                Log in
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginContent;
