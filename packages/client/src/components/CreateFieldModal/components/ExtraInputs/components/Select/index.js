import FormikInput from "components/formik/FormikInput";
import FormikSelect from "components/formik/FormikSelect";
import FormikSwitch from "components/formik/FormikSwitch";
import FormikDragOrderInput from "components/formik/FormikDragOrderInput";

const boolean_default_options = [
  {
    label: "Single select",
    value: "single_select",
  },
  {
    label: "Multi select",
    value: "multi_select",
  },
];

const Select = ({ locked }) => {
  return (
    <>
      <FormikSelect
        label="Variant"
        name="variant"
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
