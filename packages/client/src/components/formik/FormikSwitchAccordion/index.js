import "./styles.scss";
import { useFormikContext } from "formik";
import FormikSwitch from "../FormikSwitch";

const mainClass = "formik-switch-accordion";

function getValueFromPath(obj, path) {
  const keys = path.split(".");

  return keys.reduce((acc, key) => {
    if (acc && key in acc) {
      return acc[key];
    }
    return undefined;
  }, obj);
}

const FormikSwitchAccordion = ({ label, name, content }) => {
  const { values } = useFormikContext();

  const is_active = getValueFromPath(values, name);

  return (
    <div className={mainClass}>
      <FormikSwitch name={name} label={label} />
      {!!is_active && <div className={`${mainClass}__value`}>{content}</div>}
    </div>
  );
};

export default FormikSwitchAccordion;
