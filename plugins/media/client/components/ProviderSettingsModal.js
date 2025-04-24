import { useFormik } from "formik";
import { Stack, TextField } from "@mui/material";

import AsideModal from "components/AsideModal";

import { useMedia } from "context/client/media";
import mediaSettingsFields from "./mediaSettingsFields.js";

import tableInputRender from "libs/tableInputRender";

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

  const onSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    try {
      // const formData = new FormData();
      // Object.keys(values)?.forEach((item) => {
      //   if (!!!values?.[item]?.size) {
      //     formData.append(
      //       item,
      //       values?.[item]?.file ||
      //         values?.[item]?.id ||
      //         (typeof values?.[item] === "object"
      //           ? JSON.stringify(values?.[item])
      //           : values?.[item])
      //     );
      //   }
      // });
      // if (open?.id) {
      //   await updateTableEntry(open?.id, formData);
      // } else {
      //   await addTableEntry(formData);
      // }
      // resetForm({ values });
    } catch (err) {
      // setSubmitting(false);
      // setErrors(err?.response?.data?.errors);
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
        submitDisabled={!formik.dirty}
        onSubmit={formik.handleSubmit}
        submitLoading={formik.isSubmitting}
        header={title}
      >
        <Stack gap={2} direction="column">
          {settings_fields?.map((item, index) =>
            tableInputRender(item, formik)
          )}
          {/* {table_data?.table?.fields?.map((item, index) => {
            if (!!!open?.id) {
              if (item?.slug === "id") return null;
            }

            return (
              <div key={index}>
                {tableInputRender(
                  item,
                  formik,
                  table_data?.table?.display_name
                )}
              </div>
            );
          })} */}
        </Stack>
      </AsideModal>
    </form>
  );
};

export default ProviderSettingsModal;
