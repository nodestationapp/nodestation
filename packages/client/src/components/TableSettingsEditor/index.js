import { Form, Formik } from "formik";

import { useTable } from "context/client/table";
import InputElementsEditor from "components/InputElementsEditor";

const TableSettingsEditor = ({ form }) => {
  const { updateTable } = useTable();

  const onSubmit = async (values, setSubmitting, resetForm) => {
    try {
      await updateTable(values);

      resetForm({ values });
    } catch (err) {
      setSubmitting(false);
      console.error(err);
    }
  };

  return (
    <Formik
      initialValues={form}
      enableReinitialize={true}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmit(values, setSubmitting, resetForm);
      }}
    >
      {() => (
        <Form autoComplete="off" style={{ width: "100%" }}>
          <InputElementsEditor />
        </Form>
      )}
    </Formik>
  );
};

export default TableSettingsEditor;
