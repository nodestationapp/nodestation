import { useEffect } from "react";
import { useFormikContext } from "formik";

import FormikInput from "components/formik/FormikInput";
import FormikSelect from "components/formik/FormikSelect";
import FormikSwitch from "components/formik/FormikSwitch";
import FormikTextarea from "components/formik/FormikTextarea";

const variant_options = [
  {
    label: "Short",
    value: "short",
  },
  {
    label: "Long",
    value: "long",
  },
];

const Text = ({ locked }) => {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (!!values?.variant) return;
    setFieldValue("variant", "short");
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
      {values?.variant === "short" ? (
        <FormikInput label="Default value" name="default" />
      ) : (
        <FormikTextarea label="Default value" name="default" />
      )}
      <FormikSwitch label="Required" name="required" disabled={locked} />
    </>
  );
};

export default Text;
