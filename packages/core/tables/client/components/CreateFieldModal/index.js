import slugify from "slugify";
import { useFormik, FormikContext } from "formik";

import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { AsideModal } from "@nstation/design-system";
import ExtraInputs from "./components/ExtraInputs/index.js";

import field_type_data from "../../utils/field_type_data.js";

const CreateFieldModal = ({ index, form, onClose, formik: mainFormik }) => {
  const onSubmit = async (formik_values) => {
    let temp = [...mainFormik?.values?.fields];

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
        relation: formik_values?.relation,
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
        relation: formik_values?.relation,
        primary_key: formik_values?.primary_key,
      });
    }

    mainFormik.setFieldValue("fields", temp);
    mainFormik.submitForm();
    onClose();
  };

  const formik = useFormik({
    initialValues: {
      name: form?.name || "",
      type: form?.type || null,
      variant: form?.variant || null,
      multi: !!form?.multi,
      default: form?.default || null,
      options: form?.options || [],
      required: form?.required || false,
      relation: form?.relation || "",
      primary_key: form?.primary_key || "",
    },
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <AsideModal
      header="Add field"
      onClose={onClose}
      onSubmit={formik.handleSubmit}
      submitLoading={formik.isSubmitting}
    >
      <Stack direction="column" gap={2}>
        <TextField
          fullWidth
          name="name"
          label="Name"
          variant="outlined"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.name}
          helperText={formik.errors.name}
          disabled={form?.origin === "system"}
        />
        <FormControl fullWidth>
          <InputLabel id="type-select-label">Type</InputLabel>
          <Select
            name="type"
            label="Type"
            variant="outlined"
            labelId="type-select-label"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.type}
            helperText={formik.errors.type}
            disabled={form?.origin === "system"}
          >
            {field_type_data?.map((item) => (
              <MenuItem value={item?.value}>
                <Stack direction="row" gap={1.5} alignItems="center">
                  {item?.icon}
                  {item?.label}
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormikContext.Provider value={formik}>
          <ExtraInputs
            locked={form?.origin === "system"}
            type={formik.values.type}
          />
        </FormikContext.Provider>
      </Stack>
    </AsideModal>
  );
};

export default CreateFieldModal;
