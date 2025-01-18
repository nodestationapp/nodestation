import "./styles.scss";

import { Form, Formik } from "formik";

import KeyViewer from "components/KeyViewer";
import AsideModal from "components/AsideModal";
import FormikInput from "components/formik/FormikInput";
import FormikSelect from "components/formik/FormikSelect";

import { useMedia } from "context/client/media";

import mediaSettingsFields from "libs/helpers/mediaSettingsFields";

const title_render = (type) => {
  switch (type) {
    case "local":
      return "Local";
    case "aws":
      return "Amazon S3";
    case "digitalocean":
      return "DigitalOcean";
    case "wasabi":
      return "Wasabi";
    default:
      return "";
  }
};

const input_render = (index, item, type) => {
  switch (item?.type) {
    case "select":
      return (
        <FormikSelect
          key={index}
          name={`${type}.${item?.name}`}
          label={item?.label}
          options={item?.options}
        />
      );
    default:
      return (
        <FormikInput
          key={index}
          type={item?.type}
          name={`${type}.${item?.name}`}
          label={item?.label}
        />
      );
  }
};

const MediaProviderModal = ({ type = "local", onClose }) => {
  const { media_settings, updateMediaSettings } = useMedia();

  const onSubmit = async (values, setSubmitting) => {
    try {
      await updateMediaSettings(values);
      onClose();
    } catch (err) {
      setSubmitting(false);
      console.error(err);
    }
  };

  const settings_fields = mediaSettingsFields(type, media_settings);
  const title = title_render(type);

  const initial_values = settings_fields.reduce((acc, item) => {
    acc[item.name] = item.value || "";
    return acc;
  }, {});

  return (
    <Formik
      initialValues={{
        [type]: { ...initial_values },
      }}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values, setSubmitting);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <AsideModal
          header={title}
          onSubmit={submitForm}
          loading={isSubmitting}
          submit_label={
            <>
              Save
              <KeyViewer data={["⌘", "S"]} />
            </>
          }
          onClose={onClose}
        >
          <Form className="form" autoComplete="off" style={{ width: "100%" }}>
            {settings_fields?.map((item, index) =>
              input_render(index, item, type)
            )}
          </Form>
        </AsideModal>
      )}
    </Formik>
  );
};

export default MediaProviderModal;
