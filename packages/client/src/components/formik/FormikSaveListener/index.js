import "./styles.scss";

import { useEffect } from "react";
import { useFormikContext } from "formik";

const FormikSaveListener = ({ disabled }) => {
  const { submitForm } = useFormikContext();

  const onSubmitHandler = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "s") {
      e.preventDefault();

      if (!!!disabled) {
        submitForm();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onSubmitHandler);
    return () => {
      document.removeEventListener("keydown", onSubmitHandler);
    };
    // eslint-disable-next-line
  }, [disabled]);

  return null;
};

export default FormikSaveListener;
