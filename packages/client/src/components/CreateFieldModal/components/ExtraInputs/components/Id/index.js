import FormikSelect from "components/formik/FormikSelect";
import FormikSwitch from "components/formik/FormikSwitch";

const id_default_options = [
  {
    label: "generate_id()",
    value: "generate_id()",
  },
];

const Id = ({ locked }) => {
  return (
    <>
      <FormikSelect
        label="Default value"
        name="default"
        disabled={locked}
        removeActiveLabel={true}
        options={id_default_options}
      />
      <FormikSwitch label="Required" name="required" disabled={locked} />
    </>
  );
};

export default Id;
