import { useState } from "react";
import { useFormik } from "formik";
import Stack from "@mui/material/Stack";

import { AsideModal } from "@nstation/design-system";
import { clientFieldTypes } from "@nstation/field-types";

import { useTable } from "@nstation/tables/client/contexts/table.js";
import TableRowEditorPreview from "./Preview.js";

const TableRowEditor = ({ open, onClose, onEntrySubmit }) => {
  const fieldTypes = clientFieldTypes();
  const { data: table_data, addTableEntry, tableRefetch } = useTable();
  const [editMode, setEditMode] = useState(false);

  const edit_mode_view = !!editMode || !open?.id;

  const onSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    try {
      table_data?.table?.fields?.forEach((item) => {
        if (item?.type === "media") {
          values[item?.slug] = values[item?.slug]?.id || null;
        }

        if (item?.type === "relation") {
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
        onClose={editMode ? () => setEditMode(false) : onClose}
        preventOnClose={!!edit_mode_view}
        onSubmit={edit_mode_view ? formik.handleSubmit : null}
        submitLoading={formik.isSubmitting}
        header={"Details" || "Add entry"}
        removeActions={!edit_mode_view}
      >
        <Stack gap={1.5} direction="column">
          {!!edit_mode_view ? (
            <>
              {table_data?.table?.fields?.map((data) => {
                if (!!!open?.id) {
                  if (data?.slug === "id") return null;
                }

                const inputRender = fieldTypes?.find(
                  (item) => data?.type === item?.key
                )?.inputRender;

                if (!!inputRender) {
                  return inputRender({ data, formik });
                } else {
                  return null;
                }
              })}
            </>
          ) : (
            <TableRowEditorPreview
              data={open}
              setEditMode={setEditMode}
              table_data={table_data}
              fieldTypes={fieldTypes}
            />
          )}
        </Stack>
      </AsideModal>
    </form>
  );
};

export default TableRowEditor;
