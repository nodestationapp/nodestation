import "./styles.scss";

import { Formik, Form } from "formik";
import AsideModal from "components/AsideModal";
import FormikSaveListener from "components/formik/FormikSaveListener";

import editorSchema from "libs/validations/editorSchema";
import editorFormikRender from "libs/helpers/editorFormikRender";
import editorOptionsRender from "libs/helpers/editorOptionsRender";
import editorTitleInputRender from "libs/helpers/editorTitleInputRender";
import { useEditor } from "context/client/editor";

const mainClass = "content-editor-modal";

const ContentEditorModal = ({ data, type = "endpoints", onClose }) => {
  const { updateEntry } = useEditor();

  const onSubmitHandler = async (values, setSubmitting) => {
    try {
      const path = `${type}${data?.path}/${data?.name}`;
      const new_path = `${values?.type}${values?.name}/${values?.method}`;

      const formatted_values = {
        path,
        ...(path !== new_path && { new_path }),
        properties: values?.properties,
      };

      await updateEntry(formatted_values);
      onClose();
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  const initial_values = editorFormikRender(type, data);
  const editor_options = editorOptionsRender(type);
  const title_input = editorTitleInputRender(type);

  return (
    <Formik
      validateOnChange
      initialValues={initial_values}
      validationSchema={editorSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmitHandler(values, setSubmitting, resetForm);
      }}
    >
      {({ submitForm, isSubmitting, dirty }) => (
        <Form autoComplete="off" style={{ width: "100%" }}>
          <AsideModal
            onClose={onClose}
            submit_label="Save"
            onSubmit={submitForm}
            loading={isSubmitting}
            submit_keys={["⌘", "S"]}
          >
            <div className={mainClass}>
              <div className={`${mainClass}__title`}>{title_input}</div>
              <div className={`${mainClass}__wrapper`}>{editor_options}</div>
            </div>
            <FormikSaveListener disabled={!dirty} />
          </AsideModal>
        </Form>
      )}
    </Formik>
  );
};

export default ContentEditorModal;
