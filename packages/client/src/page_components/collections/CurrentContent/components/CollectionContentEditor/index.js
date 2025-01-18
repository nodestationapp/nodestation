import { Formik, Form } from "formik";

import Modal from "components/Modal";

import collectionInputRender from "libs/collectionInputRender";

import { useCollection } from "context/client/collection";

const CollectionContentEditor = ({ data, onClose }) => {
  const { data: collection_data, updateCollectionEntry } = useCollection();

  const init_values = {};

  const onSubmit = async (values, setSubmitting) => {
    try {
      await updateCollectionEntry(data?.id, values);
      onClose();
    } catch (err) {
      setSubmitting(false);
      console.error(err);
    }
  };

  return (
    <Formik
      initialValues={init_values}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values, setSubmitting);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form autoComplete="off" style={{ width: "100%" }}>
          <Modal
            header=""
            onClose={onClose}
            onSubmit={submitForm}
            loading={isSubmitting}
            submit_label="Submit"
            size="full"
            withMaximize={true}
          >
            <div className="form form--wrap">
              {collection_data?.collection?.fields?.map((item, index) => (
                <div
                  key={index}
                  style={item?.type === "long_text" ? { width: "100%" } : {}}
                >
                  {collectionInputRender(item)}
                  {/* <FormikInput name={item?.slug} label={item?.name} /> */}
                </div>
              ))}
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default CollectionContentEditor;
