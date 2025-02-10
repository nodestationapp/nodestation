import slugify from "slugify";
import { Form, Formik, useFormikContext } from "formik";

import KeyViewer from "components/KeyViewer";
import AsideModal from "components/AsideModal";
import ExtraInputs from "./components/ExtraInputs";
import FormikInput from "components/formik/FormikInput";
import FormikSelect from "components/formik/FormikSelect";

import field_type_data from "libs/field_type_data";

const CreateFieldModal = ({ index, form, onClose }) => {
  const { values, setFieldValue } = useFormikContext();

  const formatted_field_type_data = field_type_data?.filter(
    (item) => !!!item?.hidden
  );

  const onSubmit = async (formik_values) => {
    let temp = [...values?.fields];

    if (index >= 0) {
      if (!!formik_values?.primary_key) {
        temp = temp?.map((item) => ({
          ...item,
          primary_key: false,
        }));
      }

      if (!!formik_values?.options) {
        formik_values?.options?.forEach((item) => delete item?.LabelComponent);
      }

      temp[index] = {
        ...temp[index],
        type: formik_values?.type,
        name: formik_values?.name,
        variant: formik_values?.variant,
        multi: formik_values?.multi,
        default: formik_values?.default,
        required: formik_values?.required,
        options: formik_values?.options,
        primary_key: formik_values?.primary_key,
      };
    } else {
      const slug = slugify(formik_values?.name, {
        replacement: "_",
        lower: true,
      });

      temp.push({
        slug,
        name: formik_values?.name,
        multi: formik_values?.multi,
        type: formik_values?.type,
        variant: formik_values?.variant,
        default: formik_values?.default,
        required: formik_values?.required,
        options: formik_values?.options,
        primary_key: formik_values?.primary_key,
      });
    }

    setFieldValue("fields", temp);
    onClose();
  };

  return (
    <Formik
      initialValues={{
        name: form?.name || "",
        type: form?.type || "",
        variant: form?.variant || "",
        multi: form?.multi || "",
        default: form?.default || "",
        options: form?.options || [],
        required: form?.required || false,
        primary_key: form?.primary_key || "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values, setSubmitting);
      }}
    >
      {({ submitForm }) => (
        <Form autoComplete="off" style={{ width: "100%" }}>
          <AsideModal
            header="Add field"
            onClose={onClose}
            onSubmit={submitForm}
            submit_label={
              <>
                Save
                <KeyViewer data={["⌘", "S"]} />
              </>
            }
          >
            <div className="form">
              <FormikInput
                label="Name"
                name="name"
                disabled={form?.origin === "system"}
              />
              <FormikSelect
                label="Type"
                name="type"
                disabled={form?.origin === "system"}
                removeActiveLabel={true}
                options={formatted_field_type_data}
              />
              <ExtraInputs locked={form?.origin === "system"} />
            </div>
          </AsideModal>
        </Form>
      )}
    </Formik>
  );
};

export default CreateFieldModal;
