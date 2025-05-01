import { useFormik } from "formik";
import { Stack } from "@mui/material";

import AsideModal from "components/AsideModal";

import tableInputRender from "./components/tableInputRender.js";

import { useTable } from "@nstation/core/tables/client/contexts/table.js";

const TableRowEditor = ({ open, onClose, onEntrySubmit }) => {
  const {
    data: table_data,
    addTableEntry,
    updateTableEntry,
    tableRefetch,
  } = useTable();

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
        if (!!onEntrySubmit) {
          await onEntrySubmit(formData);
          tableRefetch();
        } else {
          await updateTableEntry(open?.id, formData);
        }
      } else {
        if (!!onEntrySubmit) {
          await onEntrySubmit(formData);
          tableRefetch();
        } else {
          await addTableEntry(formData);
        }
      }

      onClose();

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
