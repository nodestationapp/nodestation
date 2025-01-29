import { Formik, Form } from "formik";

import KeyViewer from "components/KeyViewer";
import AsideModal from "components/AsideModal";

import tableInputRender from "libs/tableInputRender";

import { useTable } from "context/client/table";
import validationSchema from "libs/validationSchema";

const mapDefaults = (schema, value, is_update) => {
  value = value === null ? null : value;

  if (!!is_update) {
    return value;
  }

  switch (schema?.type) {
    case "boolean":
      return !!schema?.default ? 1 : 0;
    default:
      return schema?.default || null;
  }
};

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

      onClose();
    } catch (err) {
      setSubmitting(false);
      console.error(err);
    }
  };

  let formatted_data = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      mapDefaults(
        table_data?.table?.fields?.find((item) => item?.slug === key),
        value,
        !!data?.id
      ),
    ])
  );

  const validation = validationSchema(table_data?.table?.fields);

  return (
    <Formik
      initialValues={formatted_data}
      validationSchema={validation}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values, setSubmitting);
      }}
    >
      {({ values, submitForm, isSubmitting }) => (
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
