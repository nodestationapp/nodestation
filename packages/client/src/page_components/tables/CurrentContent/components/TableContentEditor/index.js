import { Formik, Form } from "formik";

import KeyViewer from "components/KeyViewer";
import AsideModal from "components/AsideModal";

import tableInputRender from "libs/tableInputRender";

import { useTable } from "context/client/table";

const TableContentEditor = ({ data = {}, onClose }) => {
  const { data: table_data, addTableEntry, updateTableEntry } = useTable();

  const onSubmit = async (values, setSubmitting, setErrors) => {
    try {
      const formData = new FormData();

      Object.keys(values)?.forEach((item) => {
        if (!!!values?.[item]?.size) {
          formData.append(item, values?.[item]?.file || values?.[item]);
        }
      });

      if (data?.id) {
        await updateTableEntry(data?.id, formData);
      } else {
        await addTableEntry(formData);
      }

      onClose();
    } catch (err) {
      setSubmitting(false);
      setErrors(err?.response?.data?.errors);
    }
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        onSubmit(values, setSubmitting, setErrors);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form autoComplete="off" style={{ width: "100%" }}>
          <AsideModal
            header={data?.id || "Add entry"}
            onClose={onClose}
            onSubmit={submitForm}
            loading={isSubmitting}
            submit_label={
              <>
                Save
                <KeyViewer data={["⌘", "S"]} />
              </>
            }
          >
            <div className="form form--wrap">
              {table_data?.table?.fields?.map((item, index) => {
                if (!!!data?.id) {
                  if (item?.slug === "id") return null;
                }
                return <div key={index}>{tableInputRender(item)}</div>;
              })}
            </div>
          </AsideModal>
        </Form>
      )}
    </Formik>
  );
};

export default TableContentEditor;
