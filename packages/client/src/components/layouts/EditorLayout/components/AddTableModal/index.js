import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import Modal from "components/Modal";
import FormikInput from "components/formik/FormikInput";

import api from "libs/api";
import { useApp } from "context/app";

const AddTableModal = ({ onClose }) => {
  const { setTables } = useApp();
  const navigate = useNavigate();

  const onSubmit = async (values, setSubmitting) => {
    try {
      const table = await api.post("/tables", { ...values });

      navigate(`/tables/${table?.id}/settings`);

      setTables((prev) => [...prev, { id: table?.id, name: values?.name }]);

      onClose();
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values, setSubmitting);
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
              <FormikInput name="name" label="Table name" />
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default AddTableModal;
