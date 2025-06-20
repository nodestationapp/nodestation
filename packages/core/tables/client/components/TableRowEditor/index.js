import { useFormik } from "formik";
import Stack from "@mui/material/Stack";

import { AsideModal } from "@nstation/design-system";

import tableInputRender from "../TableRowEditor/components/tableInputRender.js";

import { useTable } from "@nstation/tables/client/contexts/table.js";

const TableRowEditor = ({ open, onClose, onEntrySubmit }) => {
  const { data: table_data, addTableEntry, tableRefetch } = useTable();

  const onSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    try {
      table_data?.table?.fields?.forEach((item) => {
        if (item?.type === "media") {
          values[item?.slug] = values[item?.slug]?.id || null;
        }

        if (item?.type === "user") {
          values[item?.slug] = values[item?.slug]?.id || null;
        }

        if (!!item?.relation) {
          values[item?.slug] = values[item?.slug]?.id || null;
        }
      });

      if (!!onEntrySubmit) {
        await onEntrySubmit(values);
        tableRefetch();
      } else {
        await addTableEntry(values);
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
        header={open?.[table_data?.table?.displayName || "id"] || "Add entry"}
      >
        <Stack gap={1.5} direction="column">
          {table_data?.table?.fields?.map((item, index) => {
            if (!!!open?.id) {
              if (item?.slug === "id") return null;
            }

            return <div key={index}>{tableInputRender(item, formik)}</div>;
          })}
        </Stack>
      </AsideModal>
    </form>
  );
};

export default TableRowEditor;
