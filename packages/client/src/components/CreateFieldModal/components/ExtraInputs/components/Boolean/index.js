import FormikSelect from "components/formik/FormikSelect";
import FormikSwitch from "components/formik/FormikSwitch";

const boolean_default_options = [
  {
    label: "NULL",
    value: null,
  },
  {
    label: "TRUE",
    value: true,
  },
  {
    label: "FALSE",
    value: false,
  },
];

const Boolean = () => {
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
};

export default Boolean;
