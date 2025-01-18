import "./styles.scss";

import { useFormikContext } from "formik";
import { useEffect, useState } from "react";

import Card from "components/Card";
import List from "components/List";
import CreateFieldModal from "components/CreateFieldModal";
import TransparentButton from "components/TransparentButton";

import { PlusIcon } from "@heroicons/react/24/outline";

const mainClass = "input-elements-editor";

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

  const formatted_fields =
    values?.fields?.length > 0
      ? [
          {
            items: [
              ...values?.fields?.map((item, index) => ({
                ...item,
                name: item?.name,
                locked: item?.locked,
                onclick: () => setAddFieldModal({ data: item, index }),
                onRemoveClick: () => onRemove(index),
              })),
            ],
            draggable: true,
          },
        ]
      : [];

  return (
    <>
      <Card title="Input elements">
        <div className={mainClass}>
          <List
            type="forms_field"
            data={formatted_fields}
            onOrderChange={(value) => setFieldValue("fields", value)}
          />
          <div className={`${mainClass}__action`}>
            {/* <Button onClick={() => setAddFieldModal(true)}>Add field</Button> */}
            <TransparentButton
              onClick={() => setAddFieldModal(true)}
              icon={<PlusIcon />}
              label="Add field"
            />
          </div>
        </div>
      </Card>
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
