import { useFormik } from "formik";
import Stack from "@mui/material/Stack";

import { AsideModal } from "@nstation/design-system";

import { useMedia } from "../contexts/media.js";
import mediaSettingsFields from "../utils/mediaSettingsFields.js";

import tableInputRender from "@nstation/tables/client/components/TableRowEditor/components/tableInputRender.js";

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

const ProviderSettingsModal = ({ open, onClose }) => {
  const { media_settings, updateMediaSettings } = useMedia();

  const title = title_render(open);
  const settings_fields = mediaSettingsFields(open, media_settings);

  const initialValues = settings_fields.reduce((acc, item) => {
    acc[item.slug] = item.value || "";
    return acc;
  }, {});

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await updateMediaSettings({ [open]: values });
      onClose();
    } catch (err) {
      setSubmitting(false);
      setErrors(err?.response?.data?.errors);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <AsideModal
        open={open}
        onClose={onClose}
        onSubmit={formik.handleSubmit}
        submitLoading={formik.isSubmitting}
        header={title}
      >
        <Stack gap={2} direction="column">
          {settings_fields?.map((item) => tableInputRender(item, formik))}
        </Stack>
      </AsideModal>
    </form>
  );
};

export default ProviderSettingsModal;
