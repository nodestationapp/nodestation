import { useFormik } from "formik";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import List from "../List/index.js";
import CreateFieldModal from "../CreateFieldModal/index.js";

import Add from "@mui/icons-material/Add";

const InputElementsEditor = ({ data, onSubmit }) => {
  const [add_field_modal, setAddFieldModal] = useState(false);

  const onSubmitHandler = async (values, { resetForm }) => {
    try {
      await onSubmit(values);
      resetForm({ values });
    } catch (err) {
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues: data,
    onSubmit: onSubmitHandler,
    enableReinitialize: true,
  });

  const onSubmitKey = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "s") {
      e.preventDefault();
      onSubmitHandler();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onSubmitKey);

    return () => {
      document.removeEventListener("keydown", onSubmitKey);
    };
    // eslint-disable-next-line
  }, []);

  const onRemove = (index) => {
    let temp = [...formik?.values?.fields];
    temp.splice(index, 1);

    formik.setFieldValue("fields", temp);
    // formik.submitForm();
  };

  const formatted_fields = formik?.values?.fields?.map((item, index) => ({
    ...item,
    name: item?.name,
    onRemoveClick: () => onRemove(index),
    onclick: () => setAddFieldModal({ data: item, index }),
  }));

  return (
    <>
      <Stack direction="column" gap={1.5}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="button"
            variant="contained"
            disabled={!formik.dirty}
            onClick={formik.submitForm}
          >
            Save changes
          </Button>
        </Box>
        <List
          sx={{
            border: "1px solid red",
          }}
          type="forms_field"
          data={[...formatted_fields]}
          disabled={process.env.NODE_ENV !== "development"}
          onOrderChange={(value) => {
            formik.setFieldValue("fields", value);
          }}
        />
        {process.env.NODE_ENV === "development" && (
          <Button
            sx={{ mr: "auto" }}
            variant="text"
            size="small"
            startIcon={<Add />}
            color="primary"
            onClick={() => setAddFieldModal(true)}
          >
            Add field
          </Button>
        )}
      </Stack>
      {!!add_field_modal && process.env.NODE_ENV === "development" && (
        <CreateFieldModal
          formik={formik}
          form={add_field_modal?.data}
          index={add_field_modal?.index}
          onClose={() => setAddFieldModal(false)}
        />
      )}
    </>
  );
};

export default InputElementsEditor;
