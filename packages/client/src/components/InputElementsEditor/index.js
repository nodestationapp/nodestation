import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";

import List from "components/List";
import CreateFieldModal from "components/CreateFieldModal";

import { Add } from "@mui/icons-material";

const InputElementsEditor = ({ data }) => {
  const [add_field_modal, setAddFieldModal] = useState(false);

  const onSubmit = () => {
    //todo
    console.info(data);
  };

  const formik = useFormik({
    initialValues: data,
    onSubmit,
    enableReinitialize: true,
  });

  const onSubmitHandler = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "s") {
      e.preventDefault();
      onSubmit();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onSubmitHandler);

    return () => {
      document.removeEventListener("keydown", onSubmitHandler);
    };
    // eslint-disable-next-line
  }, []);

  const onRemove = (index) => {
    let temp = [...formik?.values?.fields];
    temp.splice(index, 1);

    formik.setFieldValue("fields", temp);
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
          onOrderChange={(value) => formik.setFieldValue("fields", value)}
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
