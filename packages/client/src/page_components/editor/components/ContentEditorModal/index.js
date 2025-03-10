import "./styles.scss";

import { Formik, Form } from "formik";
import AsideModal from "components/AsideModal";
import FormikSaveListener from "components/formik/FormikSaveListener";

import editorSchema from "libs/validations/editorSchema";
import editorFormikRender from "libs/helpers/editorFormikRender";
import editorOptionsRender from "libs/helpers/editorOptionsRender";
import editorTitleInputRender from "libs/helpers/editorTitleInputRender";

const mainClass = "content-editor-modal";

const ContentEditorModal = ({ data, type = "ep", onClose }) => {
  const onSubmitHandler = async (values, setSubmitting, resetForm) => {
    try {
      // await onSubmit(values, setSubmitting, resetForm);
    } catch (err) {
      console.error(err);
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
      {({ submitForm, isSubmitting, dirty, errors }) => (
        <Form autoComplete="off" style={{ width: "100%" }}>
          <AsideModal
            onClose={onClose}
            submit_label="Save"
            onSubmit={submitForm}
            loading={isSubmitting}
            header={data?.name || "Add user"}
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
