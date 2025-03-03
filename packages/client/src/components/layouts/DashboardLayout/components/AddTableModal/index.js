import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import Modal from "components/Modal";
import FormikInput from "components/formik/FormikInput";

import api from "libs/api";

const AddTableModal = ({ type, onClose }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSubmit = async (values, setSubmitting, setErrors) => {
    try {
      const table = await api.post("/tables", { ...values, type });

      const typeEndpoint = type === "form" ? "forms" : "tables";
      navigate(`/${typeEndpoint}/${table?.id}/settings`);

      queryClient.refetchQueries("tables");

      onClose();
    } catch (err) {
      setErrors(err?.response?.data?.errors);
      setSubmitting(false);
    }
  };

  const inputLabel = type === "form" ? "Form name" : "Table name";

  return (
    <Formik
      initialValues={{
        name: "",
      }}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        onSubmit(values, setSubmitting, setErrors);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form autoComplete="off" style={{ width: "100%" }}>
          <Modal
            header="Add table"
            onClose={onClose}
            onSubmit={submitForm}
            submit_label="Add"
            loading={isSubmitting}
          >
            <div className="form">
              <FormikInput name="name" label={inputLabel} />
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default AddTableModal;
