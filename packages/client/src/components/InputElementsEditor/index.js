import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";

import List from "components/List";
import CreateFieldModal from "components/CreateFieldModal";

import { Add } from "@mui/icons-material";

const InputElementsEditor = ({ data, onSubmit }) => {
  const [add_field_modal, setAddFieldModal] = useState(false);

  const onSubmitHandler = async (values) => {
    try {
      await onSubmit(values);
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
    formik.submitForm();
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
        <List
          sx={{
            border: "1px solid red",
          }}
          type="forms_field"
          data={formatted_fields}
          onOrderChange={(value) => {
            formik.setFieldValue("fields", value);
            formik.submitForm();
          }}
        />
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
      </Stack>
      {!!add_field_modal && (
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
