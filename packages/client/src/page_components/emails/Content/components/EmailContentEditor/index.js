import "./styles.scss";

import { Formik, Form } from "formik";

import Modal from "components/Modal";
import KeyViewer from "components/KeyViewer";
import CodeEditor from "components/CodeEditor";
import FormikInput from "components/formik/FormikInput";
import FormikSaveListener from "components/formik/FormikSaveListener";

import { useEmails } from "context/client/emails";
import api from "libs/api";

const mainClass = "email-content-editor";

const EmailContentEditor = ({ id, onClose, setId }) => {
  const { emails, refetchEmails } = useEmails();

  const selected_email = emails?.find((item) => item?.id === id);

  const onSubmit = async (values, setSubmitting, resetForm) => {
    try {
      if (!!id && id !== "new") {
        await api.put(`/emails/${id}`, { ...values });
      } else {
        id = await api.post("/emails", { ...values });
      }

      setId(id);
      setSubmitting(false);
      refetchEmails();
    } catch (err) {
      setSubmitting(false);
      console.error(err);
    }
  };

  return (
    <Formik
      initialValues={{
        name: selected_email?.name || "",
        subject: selected_email?.subject || "",
        content: selected_email?.content || "",
      }}
      enableReinitialize={true}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmit(values, setSubmitting, resetForm);
      }}
    >
      {({ submitForm, isSubmitting, dirty }) => (
        <Form autoComplete="off" style={{ width: "100%" }}>
          <Modal
            size="wide"
            noPadding
            onSubmit={submitForm}
            onClose={onClose}
            loading={isSubmitting}
            submit_disabled={!!!dirty}
            submit_label={
              <>
                Save
                <KeyViewer data={["⌘", "S"]} />
              </>
            }
          >
            <div className={mainClass}>
              <div className={`${mainClass}__inputs`}>
                <FormikInput name="name" label="Name" />
                <FormikInput name="subject" label="Subject" />
              </div>
              <CodeEditor language="html" />
            </div>
          </Modal>
          <FormikSaveListener />
        </Form>
      )}
    </Formik>
  );
};

export default EmailContentEditor;
