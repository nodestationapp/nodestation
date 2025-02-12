import FormikInput from "components/formik/FormikInput";
import FormikSelect from "components/formik/FormikSelect";
import FormikSwitch from "components/formik/FormikSwitch";
import FormikDragOrderInput from "components/formik/FormikDragOrderInput";

const boolean_default_options = [
  {
    label: "Single",
    value: false,
  },
  {
    label: "Multi",
    value: true,
  },
];

const Select = ({ locked }) => {
  return (
    <>
      <FormikSelect
        label="Variant"
        name="multi"
        removeActiveLabel={true}
        options={boolean_default_options}
      />
      <FormikInput label="Default value" name="default" />
      <FormikSwitch label="Required" name="required" disabled={locked} />
      <FormikDragOrderInput name="options" />
    </>
  );
};

export default Select;
