import { Formik, Form } from "formik";

import FormikSaveListener from "components/formik/FormikSaveListener";

import editorSchema from "libs/validations/editorSchema";
import editorFormikRender from "libs/helpers/editorFormikRender";
import editorOptionsRender from "libs/helpers/editorOptionsRender";
import editorTitleInputRender from "libs/helpers/editorTitleInputRender";

import { useEditor } from "context/client/editor";

const mainClass = "editor-content";

const ContentEditor = ({ data, onSubmit, type = "ep" }) => {
  const { editor, id } = useEditor();

  const current_editor = editor?.find((item) => item?.id === id);

  const onSubmitHandler = async (values, setSubmitting, resetForm) => {
    try {
      await onSubmit(values, setSubmitting, resetForm);
    } catch (err) {
      console.error(err);
    }
  };

  const initial_values = editorFormikRender(type, current_editor);
  const editor_options = editorOptionsRender(type);
  const title_input = editorTitleInputRender(type);

  const key = !!data ? data?.id : type;

  return (
    <Formik
      key={[key, id]}
      validateOnChange
      initialValues={initial_values}
      enableReinitialize={true}
      validationSchema={editorSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmitHandler(values, setSubmitting, resetForm);
      }}
    >
      {({ submitForm, isSubmitting, dirty, errors }) => (
        <Form autoComplete="off" style={{ width: "100%" }}>
          <div className={mainClass}>
            <div className={`${mainClass}__title`}>{title_input}</div>
            <div className={`${mainClass}__wrapper`}>{editor_options}</div>
          </div>
          <FormikSaveListener disabled={!dirty} />
        </Form>
      )}
    </Formik>
  );
};

export default ContentEditor;
