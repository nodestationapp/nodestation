import { useFormikContext } from "formik";

import FormikInput from "components/formik/FormikInput";
import FormikSelect from "components/formik/FormikSelect";
import FormikSwitch from "components/formik/FormikSwitch";
import FormikTextarea from "components/formik/FormikTextarea";

const boolean_default_options = [
  {
    label: "TRUE",
    value: true,
  },
  {
    label: "FALSE",
    value: false,
  },
];

const uuid_default_options = [
  {
    label: "generate_uuid()",
    value: "generate_uuid()",
  },
];

const extra_input_render = (type, locked) => {
  switch (type) {
    case "uuid":
      return (
        <>
          <FormikSelect
            label="Default value"
            name="default"
            disabled={locked}
            removeActiveLabel={true}
            options={uuid_default_options}
          />
          <FormikSwitch label="Required" name="required" disabled={locked} />
        </>
      );
    case "boolean":
      return (
        <>
          <FormikSelect
            label="Default value"
            name="default"
            removeActiveLabel={true}
            options={boolean_default_options}
          />
          <FormikSwitch label="Required" name="required" />
        </>
      );
    case "enumeration":
      return (
        <>
          <FormikTextarea label="Options" name="options" variant="light" />
          <FormikInput label="Default value" name="default" />
          <FormikSwitch label="Required" name="required" disabled={locked} />
        </>
      );
    case "long_text":
      return (
        <>
          <FormikTextarea
            label="Default value"
            name="default"
            variant="light"
          />
          <FormikSwitch label="Required" name="required" disabled={locked} />
        </>
      );
    default:
      return (
        <>
          <FormikInput label="Default value" name="default" disabled={locked} />
          <FormikSwitch label="Required" name="required" disabled={locked} />
        </>
      );
  }
};

const ExtraInputs = ({ locked }) => {
  const { values } = useFormikContext();

  if (!!!values?.type) return null;

  return extra_input_render(values?.type, locked);
};

export default ExtraInputs;
