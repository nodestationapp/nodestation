import { Formik, Form } from "formik";

import KeyViewer from "components/KeyViewer";
import AsideModal from "components/AsideModal";

import tableInputRender from "libs/tableInputRender";

import { useTable } from "context/client/table";

const TableContentEditor = ({ data = {}, onClose }) => {
  const { data: table_data, addTableEntry, updateTableEntry } = useTable();

  const onSubmit = async (values, setSubmitting) => {
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

      // await updateTableEntry(data?.id, values);
      onClose();
    } catch (err) {
      setSubmitting(false);
      console.error(err);
    }
  };

  const formatted_data = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value === undefined ? null : value,
    ])
  );

  return (
    <Formik
      initialValues={formatted_data}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values, setSubmitting);
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
                return (
                  <div
                    key={index}
                    style={item?.type === "long_text" ? { width: "100%" } : {}}
                  >
                    {tableInputRender(item)}
                  </div>
                );
              })}
            </div>
          </AsideModal>
        </Form>
      )}
    </Formik>
  );
};

export default TableContentEditor;
