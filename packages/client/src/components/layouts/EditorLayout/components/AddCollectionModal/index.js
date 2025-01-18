import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import Modal from "components/Modal";
import FormikInput from "components/formik/FormikInput";

import api from "libs/api";
import { useApp } from "context/app";

const AddCollectionModal = ({ onClose }) => {
  const { setCollections } = useApp();
  const navigate = useNavigate();

  const onSubmit = async (values, setSubmitting) => {
    try {
      const collection = await api.post("/collections", { ...values });

      navigate(`/collections/${collection?.id}/settings`);

      setCollections((prev) => [
        ...prev,
        { id: collection?.id, name: values?.name },
      ]);

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
              <FormikInput name="name" label="Collection name" />
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default AddCollectionModal;
