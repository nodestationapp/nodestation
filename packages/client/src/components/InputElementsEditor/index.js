import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";

import List from "components/List";
import CreateFieldModal from "components/CreateFieldModal";

import { Add } from "@mui/icons-material";

const InputElementsEditor = () => {
  const { values, setFieldValue, submitForm } = useFormikContext();

  const [add_field_modal, setAddFieldModal] = useState(false);

  const onSubmitHandler = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "s") {
      e.preventDefault();
      submitForm();
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
    let temp = [...values?.fields];
    temp.splice(index, 1);

    setFieldValue("fields", temp);
  };

  const formatted_fields = values?.fields?.map((item, index) => ({
    ...item,
    name: item?.name,
    onclick: () => setAddFieldModal({ data: item, index }),
    onRemoveClick: () => onRemove(index),
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
          onOrderChange={(value) => setFieldValue("fields", value)}
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
          index={add_field_modal?.index}
          form={add_field_modal?.data}
          onClose={() => setAddFieldModal(false)}
        />
      )}
    </>
  );
};

export default InputElementsEditor;
