import { useEffect } from "react";
import { useFormikContext } from "formik";

import FormikInput from "components/formik/FormikInput";
import FormikSelect from "components/formik/FormikSelect";
import FormikSwitch from "components/formik/FormikSwitch";
import FormikTextarea from "components/formik/FormikTextarea";

const variant_options = [
  {
    label: "Short text",
    value: "short_text",
  },
  {
    label: "Long text",
    value: "long_text",
  },
];

const Text = ({ locked }) => {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (!!values?.variant) return;
    setFieldValue("variant", "short_text");
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <FormikSelect
        label="Variant"
        name="variant"
        removeActiveLabel={true}
        options={variant_options}
      />
      {values?.variant === "short_text" ? (
        <FormikInput label="Default value" name="default" variant="light" />
      ) : (
        <FormikTextarea label="Default value" name="default" variant="light" />
      )}
      <FormikSwitch label="Required" name="required" disabled={locked} />
    </>
  );
};

export default Text;
