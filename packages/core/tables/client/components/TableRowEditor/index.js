import { useFormik } from "formik";
import { Stack } from "@mui/material";

import AsideModal from "components/AsideModal";

import tableInputRender from "libs/tableInputRender";

import { useTable } from "@nstation/core/tables/client/contexts/table.js";

const TableRowEditor = ({ open, onClose }) => {
  const { data: table_data, addTableEntry, updateTableEntry } = useTable();

  const onSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    try {
      const formData = new FormData();

      Object.keys(values)?.forEach((item) => {
        if (!!!values?.[item]?.size) {
          formData.append(
            item,
            values?.[item]?.file ||
              values?.[item]?.id ||
              (typeof values?.[item] === "object"
                ? JSON.stringify(values?.[item])
                : values?.[item])
          );
        }
      });

      if (open?.id) {
        await updateTableEntry(open?.id, formData);
      } else {
        await addTableEntry(formData);
      }

      resetForm({ values });
    } catch (err) {
      setSubmitting(false);
      setErrors(err?.response?.data?.errors);
    }
  };

  const formik = useFormik({
    initialValues: open,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <AsideModal
        open={open}
        onClose={onClose}
        submitDisabled={!formik.dirty}
        onSubmit={formik.handleSubmit}
        submitLoading={formik.isSubmitting}
        header={open?.[table_data?.table?.display_name || "id"] || "Add entry"}
      >
        <Stack gap={2} direction="column">
          {table_data?.table?.fields?.map((item, index) => {
            if (!!!open?.id) {
              if (item?.slug === "id") return null;
            }

            return (
              <div key={index}>
                {tableInputRender(
                  item,
                  formik,
                  table_data?.table?.display_name
                )}
              </div>
            );
          })}
        </Stack>
      </AsideModal>
    </form>
  );
};

export default TableRowEditor;
