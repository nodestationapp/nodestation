import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import Modal from "components/Modal";
import FormikInput from "components/formik/FormikInput";

import api from "libs/api";
import { useTable } from "context/client/table";

const AddTableViewModal = ({ tableId, onClose }) => {
  const { view } = useTable();
  const queryClient = useQueryClient();

  const onSubmit = async (values, setSubmitting, setErrors) => {
    try {
      await api.post("/preferences/create", { ...values, view });

      queryClient.refetchQueries("tables");

      onClose();
    } catch (err) {
      setErrors(err?.response?.data?.errors);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        table: tableId,
      }}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        onSubmit(values, setSubmitting, setErrors);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form autoComplete="off" style={{ width: "100%" }}>
          <Modal
            header="Add view"
            onClose={onClose}
            onSubmit={submitForm}
            submit_label="Add"
            loading={isSubmitting}
          >
            <div className="form">
              <FormikInput name="name" label="View name" />
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default AddTableViewModal;
