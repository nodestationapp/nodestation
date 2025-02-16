import cx from "classnames";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";

import Button from "components/Button";
import KeyViewer from "components/KeyViewer";
import CodeEditor from "components/CodeEditor";
import FormikSaveListener from "components/formik/FormikSaveListener";
import EditorContentLayout from "components/layouts/EditorContentLayout";

import editorSchema from "libs/validations/editorSchema";
import editorFormikRender from "libs/helpers/editorFormikRender";
import editorOptionsRender from "libs/helpers/editorOptionsRender";
import editorTitleInputRender from "libs/helpers/editorTitleInputRender";

import { useEditor } from "context/client/editor";
import { useOrganization } from "context/organization";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const mainClass = "editor-content";

const formatCode = async (value) => {
  const formattedCode = await prettier.format(value, {
    parser: "babel",
    plugins: [estreePlugin, parserBabel],
    singleQuote: false,
    tabWidth: 2,
    semi: true,
  });

  return formattedCode;
};

const ContentEditor = ({ data, onSubmit, loading, type }) => {
  const { setMinimizeHandler } = useOrganization();
  const { editor, id } = useEditor();

  const current_editor = editor?.find((item) => item?.id === id);

  const [fixed, setFixed] = useState(
    !!id ? localStorage.getItem("editor_resize") : false
  );

  useEffect(() => {
    if (!!!current_editor) return;
    setMinimizeHandler(current_editor?.id);
    // eslint-disable-next-line
  }, [current_editor]);

  const resizeHandler = () => {
    setFixed((prev) => !prev);

    if (!!fixed) {
      localStorage.removeItem("editor_resize");
    } else {
      localStorage.setItem("editor_resize", fixed);
    }
  };

  const onSubmitHandler = async (values, setSubmitting, resetForm) => {
    try {
      const formattedContent = await formatCode(values?.content);

      const formatted_values = {
        ...values,
        content: formattedContent,
      };

      await onSubmit(formatted_values, setSubmitting, resetForm);
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
        <EditorContentLayout
          loading={loading}
          action={
            <>
              <Button
                disabled={!dirty || Object.keys(errors)?.length > 0}
                onClick={submitForm}
                loading={isSubmitting}
              >
                Save <KeyViewer variant="light" data={["⌘", "S"]} />
              </Button>
            </>
          }
        >
          <Form autoComplete="off" style={{ width: "100%" }}>
            <div className={mainClass}>
              <div className={`${mainClass}__left`}>
                <CodeEditor />
              </div>
              <div
                className={cx(`${mainClass}__right`, {
                  [`${mainClass}__right--fixed`]: !!fixed,
                })}
              >
                <div className={`${mainClass}__right__title`}>
                  {title_input}
                </div>
                <div className={`${mainClass}__right__wrapper`}>
                  {editor_options}
                </div>
                {!!id && (
                  <button
                    type="button"
                    className={`${mainClass}__right__resize`}
                    onClick={resizeHandler}
                  >
                    <ChevronLeftIcon />
                  </button>
                )}
              </div>
            </div>
            <FormikSaveListener disabled={!dirty} />
          </Form>
        </EditorContentLayout>
      )}
    </Formik>
  );
};

export default ContentEditor;
