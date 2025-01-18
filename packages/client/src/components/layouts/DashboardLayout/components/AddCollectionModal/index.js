import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import Modal from "components/Modal";
import FormikInput from "components/formik/FormikInput";

import api from "libs/api";

const AddCollectionModal = ({ onClose }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSubmit = async (values, setSubmitting) => {
    try {
      const collection = await api.post("/tables", { ...values });

      navigate(`/collections/${collection?.id}/settings`);

      queryClient.refetchQueries("tables");

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
            header="Add collection"
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

export default AddCollectionModal;
